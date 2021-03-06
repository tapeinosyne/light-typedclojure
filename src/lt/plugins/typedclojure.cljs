(ns lt.plugins.typedclojure
  (:require [lt.plugins.typedclojure.token :as token]
            [lt.plugins.typedclojure.cursor :as cursor]
            [lt.plugins.paredit :as par]
            [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as ed]
            [lt.objs.notifos :as notifos]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior]]))


;;;; aliasing and qualification ;;;;

(def typed-alias
  '(if-let [[a typedns] (first (filter #(= (find-ns 'clojure.core.typed)
                                          (val %))
                                      (ns-aliases *ns*)))]
    (str a "/")
    (str "clojure.core.typed/")))

(defn aliased<- [f]
  (str typed-alias " " (pr-str f)))

(defn qualified<- [var]
  (str "
   (let [s '" var "
         ^clojure.lang.Var v (when (symbol? s) (resolve s))]
     (cond
      (not (var? v)) (when (symbol? s) (str s))
      (not= *ns* (.ns v)) (str \"^:no-check \"
                               (symbol (str (ns-name (.ns v)))
                                       (str (.sym v))))
      :else (str (name (symbol s)))))"))


;;;; annotation commands ;;;;

;;; raise wrappers

(defn raise* [e fun-string & {:keys [res] :or {res :replace}}]
  (object/raise e
                :eval.custom
                fun-string
                {:result-type res :verbatim true}))

(defn raise-ann [e fun-string & [opts]]
  (object/raise e
                :eval.custom
                fun-string
                (merge {:result-type :return
                        :handler e
                        :trigger ::annotate!}
                       opts)))

;;; return handling

(behavior ::annotate!
          :triggers #{::annotate!}
          :reaction (fn [this {:keys [result meta]}]
                      (let [returned (reader/read-string result)]
                        (ed/replace-selection this returned)
                        (cursor/select-relative (merge meta {:editor this})))))

;;; core.typed/ann annotator

(defn ->ann-var [token]
  (str "(str \"(\""
        (aliased<- "ann")
        "\" \""
        (if token
          (qualified<- token)
          " ")
        "\" Any)\""
        ")"))

(cmd/command {:command :typedclojure.ann.var
              :desc "Typed Clojure: annotate var"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e)}
                                    (token/->token e c))]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (notifos/set-msg! "core.typed/ann can only annotate vars")
                         (:orphan token)          (raise-ann e
                                                             (->ann-var nil)
                                                             {:sel [-4 -4]})
                         :else                    (do
                                                    (cursor/->newline-above! e c)
                                                    (raise-ann e (->ann-var (:string token)))))))})

;;; core.typed/ann-form annotator

(defn ->ann-form [s]
  (str  "(str \"(\""
        (aliased<- "ann-form")
        "\" \""
        (or (pr-str s) " ")
        "\" Any)\""
        ")"))

(cmd/command {:command :typedclojure.ann.form
              :desc "Typed Clojure: annotate form"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e) :selection true}
                                    (token/->token e c))]
                        (cond
                         (:boundary token)   (do
                                               (ed/move-cursor e (:at token))
                                               (cmd/exec! :paredit.select.parent)
                                               (raise-ann e (->ann-form (ed/selection e))))
                         (:whitespace token) (do
                                               (cmd/exec! :paredit.select.parent)
                                               (raise-ann e (->ann-form (ed/selection e))))
                         (:orphan token)     (raise-ann e
                                                        (->ann-form nil)
                                                        {:sel [-4 -4]})
                         (:selection token)  (raise-ann e (->ann-form (:string token)))
                         :else               (let [[start end] (token/bounds e (:at token))]
                                               (ed/set-selection e start end)
                                               (raise-ann e (->ann-form (:string token)))))))})

;;; core.typed/pred annotator

(defn ->pred [& [s]]
  (str "(str \"((\""
        (aliased<- "pred")
        "\" \""
        (pr-str "Any")
        "\") \""
        (if s (pr-str s))
        "\")\""
        ")"))

(cmd/command {:command :typedclojure.pred
              :desc "Typed Clojure: add predicate"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e) :selection true}
                                    (token/->token e c))
                            post-opts {:rel :start
                                       :sel [12 9]}]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (do
                                                    (ed/move-cursor e (:at token))
                                                    (cmd/exec! :paredit.select.parent)
                                                    (raise-ann e
                                                               (->pred (ed/selection e))
                                                               post-opts))
                         (:orphan token)          (raise-ann e (->pred) post-opts)
                         (:selection token)       (raise-ann e
                                                             (->pred (:string token))
                                                             post-opts)
                         :else                    (let [[start end] (token/bounds e (:at token))]
                                                    (ed/set-selection e start end)
                                                    (raise-ann e
                                                               (->pred (:string token))
                                                               post-opts)))))})

;;;; checking commands ;;;;

;;; TODO:
;;;   - Use result-type :return to provide error navigation.

;;; core.typed/check-ns-info

(def ns-checker
  (str '(let [t (require 'clojure.core.typed)
              check-ns-info (find-var 'clojure.core.typed/check-ns-info)
              t (assert check-ns-info "clojure.core.typed/check-ns-info not found")
              {:keys [delayed-errors]} (check-ns-info)]
          (if-let [res (seq delayed-errors)]
            (do
              (doseq [^Exception e res
                      :let [{:keys [env] :as data} (ex-data e)]]
                (println (str (first (clojure.string/split (.getMessage e) #"\nHint")) "\n"
                              (if (contains? data :form)
                                (:form data)
                                0) "\n"
                              "Source: " (:source env) "  "
                              "{line: " (:line env) " "
                              "ch: " (:column env) "}")))
              (str "Typed Clojure: " (count res) " errors found."))
            "Typed Clojure: no errors found."))))

(cmd/command {:command :typedclojure.check.ns
              :desc "Typed Clojure: check namespace"
              :exec (fn []
                      (raise* (pool/last-active) ns-checker :res :statusbar))})

;;; core.typed/check-form-info

(defn check-form [s]
  (str "
   (if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '" s ")))]
     (for [^Exception e res]
       (let [{:keys [env] :as data} (ex-data e)]
         (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\"
               (if (contains? data :form)
                 (str (:form data))
                 0) \"\n\")))
     (with-out-str (clojure.pprint/write (clojure.core.typed/cf " s "))))"))

(cmd/command {:command :typedclojure.check.form
              :desc "Typed Clojure: check var or form"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e) :selection true}
                                    (token/->token e c))]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (let [[start end] (par/form-boundary e (:at token) nil)
                                                        form (ed/range e start (ed/adjust-loc end 1))]
                                                    (raise* e (check-form form) :res :inline-at-cursor))
                         (:orphan token)          (notifos/set-msg! "core.typed can only check vars or forms")
                         :else                    (raise* e (check-form (:string token)) :res :inline-at-cursor))))})
