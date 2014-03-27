(ns lt.plugins.typedclojure
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as ed]
            [lt.objs.notifos :as notifos]
            [lt.plugins.paredit :as par]
            [clojure.string :as string]
            [cljs.reader :as reader])
  (:require-macros [lt.macros :refer [behavior]]))


;;;; cursor manipulation addenda ;;;;

(defn move-cursor-relative
  "Given an editor, a cursor, and a location offset {:line n :ch m}, move
   the cursor to a new location."
  [e cursor {:keys [line ch] :or [line 0 ch 0] :as offset}]
  (let [new-pos (merge-with + cursor offset)]
    (ed/move-cursor e new-pos)))

;;; To meet the requirements of our factoring functions, we supplement
;;; LT and LT-Paredit with a new command that behaves roughly as
;;; Emacs' beginning-of-defun. This will be removed when functionally
;;; equivalent patches land in the main releases.

(defn adjust-line [loc dir]
  (when loc
    (update-in loc [:line] + dir)))

(defn seek-top [ed loc]
  ;; Relies on canonical indentation; top-level forms starting at a
  ;; non-zero column will go undetected.
  (loop [loc loc]
   (let [pars (re-pattern "\\(|\\{|\\[")
         cur (second (par/scan {:ed ed
                                :loc loc
                                :dir :left
                                :regex pars
                                :skip par/in-string?}))
         adj (ed/adjust-loc cur -1)]
     (if (or (zero? (:ch cur))
             (nil? (:ch cur)))
       cur
       (recur adj)))))

(defn seek-bottom [ed loc]
  (let [->top (fn [pos] (ed/adjust-loc pos 1))
        start (seek-top ed loc)
        end (second (par/form-boundary ed (->top start) nil))]
    (->top end)))

(defn move-top [{:keys [ed loc] :as orig} dir]
  (let [[start end] (par/form-boundary ed loc nil)]
    (if (and start end)
      (let [dest (if (= dir :right)
                   (seek-bottom ed loc)
                   (seek-top ed loc))]
        (update-in orig [:edits] conj
                   {:type :cursor
                    :from dest
                    :to dest}))
      orig)))

(cmd/command {:command :typedclojure.pseudoparedit.top
              :desc "Typed Clojure: move cursor to top level"
              :hidden true
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (ed/selection? ed))
                          (object/merge! ed {::orig-pos (ed/->cursor ed)}))
                        (-> (par/ed->info ed)
                            (move-top :left)
                            (par/batched-edits))))})


;;; token and form detection

(defn ->token* [e loc]
  (let [opening? #(or (= "(" %) (= "[" %) (= "{" %))
        closing? #(or (= ")" %) (= "]" %) (= "}" %))
        token-str (fn [pos] (:string (ed/->token e pos)))
        ->bound   (fn [n] (ed/adjust-loc loc n))
        s         (token-str loc)]
    (cond
     (closing? s) {:at (->bound -1) :boundary true}
     (opening? s) {:at (->bound 1) :boundary true}
     (= " " s)    {:at loc :whitespace true}
     (empty? s)   (let [tkn (token-str (->bound 1))]
                    (cond
                     (string/blank? tkn) {:at loc :orphan true}
                     (opening? tkn)      {:at (->bound 1) :boundary true}
                     :else               {:at loc :string tkn}))
     :else        {:at loc :string s})))

(defn token-bounds* [e loc]
  (let [token (ed/->token e loc)
        ln (:line loc)]
    [{:line ln :ch (:start token)}
     {:line ln :ch (:end token)}]))


;;;; aliasing and qualification ;;;;

(def typed-alias "
  (if-let [[a typedns] (first (filter #(= (find-ns 'clojure.core.typed)
                                          (val %))
                                       (ns-aliases *ns*)))]
    (str a \"/\")
    (str \"clojure.core.typed/\"))")

(defn aliased<- [f]
  (str typed-alias " " (pr-str f)))

(defn qualified<- [var]
  (str "
       (let [s '" var "
             ^clojure.lang.Var v (when (symbol? s) (resolve s))]
         (cond
          (not (var? v))      (when (symbol? s) (str s))
          (not= *ns* (.ns v)) (str \"^:no-check \"
                                   (symbol (str (ns-name (.ns v)))
                                           (str (.sym v))))
          :else               (str (name (symbol s)))))"))


;;;; annotation commands ;;;;

;;; raise wrappers

(defn raise* [e s & {:keys [res] :or {res :replace}}]
  (object/raise e
                :eval.custom
                s
                {:result-type res :verbatim true}))

(defn raise-ann [e s & [opts]]
  (object/raise e
                :eval.custom
                s
                (merge {:result-type :return
                        :handler e
                        :trigger ::annotate!}
                       opts)))

;;; return handling

(defn post-ann [e {:keys [offset] :as meta*}]
  (let [cursor (ed/->cursor e)]
    (if offset
      (move-cursor-relative e
                            cursor
                            offset)
      (ed/set-selection e
                        (ed/adjust-loc cursor -1)
                        (ed/adjust-loc cursor -4)))))

(behavior ::annotate!
          :triggers #{::annotate!}
          :reaction (fn [this {:keys [result meta]}]
                      (let [returned (reader/read-string result)]
                        (ed/replace-selection this returned)
                        (post-ann this meta))))

;;; core.typed/ann annotator

(defn ->newline-above! [e c]
  (cmd/exec! :typedclojure.pseudoparedit.top)
  (ed/insert-at-cursor e "\n")
  (ed/move-cursor e c))

(defn ->ann-var [token]
  (str  "(str \"(\""
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
                                    (->token* e c))]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (notifos/set-msg! "core.typed/ann can only annotate vars")
                         (:orphan token)          (raise-ann e
                                                             (->ann-var nil)
                                                             {:offset {:ch -5}})
                         :else                    (do
                                                    (->newline-above! e c)
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
                                    (->token* e c))]
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
                                                        {:offset {:ch -5}})
                         (:selection token)  (raise-ann e (->ann-form (:string token)))
                         :else               (let [[start end] (token-bounds* e (:at token))]
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
              :desc "Typed Clojure: add type predicate"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e) :selection true}
                                    (->token* e c))]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (do
                                                    (ed/move-cursor e (:at token))
                                                    (cmd/exec! :paredit.select.parent)
                                                    (raise* e (->pred (ed/selection e))))
                         (:orphan token)          (raise* e (->pred))
                         (:selection token)       (raise* e (->pred (:string token)))
                         :else                    (let [[start end] (token-bounds* e (:at token))]
                                                    (ed/set-selection e start end)
                                                    (raise* e (->pred (:string token)))))))})

;;;; checking commands ;;;;

;;; TODO:
;;;   - Use result-type :return to improve display of check.ns results;
;;;     provide error navigation.

;;; core.typed/check-ns-info annotator

(def ns-checker
  (str '(let [t (require 'clojure.core.typed)
        check-ns-info (find-var 'clojure.core.typed/check-ns-info)
        t (assert check-ns-info "clojure.core.typed/check-ns-info not found")
        {:keys [delayed-errors]} (check-ns-info)]
    (if (seq delayed-errors)
      (for [^Exception e delayed-errors]
        (let [{:keys [env] :as data} (ex-data e)]
          (list (first (clojure.string/split (.getMessage e) #"\nHint")) "\n"
                (if (contains? data :form)
                  (str (:form data))
                  0) "\n"
                (str "in: " (:source env)) "  "
                (str "{line: " (:line env)) " "
                (str "ch: " (:column env) "}") "\n"
                (str "namespace: " (-> env :ns :name str)) "\n\n")))
       "No type errors found."))))

(cmd/command {:command :typedclojure.check.ns
              :desc "Typed Clojure: check namespace"
              :exec (fn []
                      (object/raise (pool/last-active)
                                    :eval.custom
                                    ns-checker
                                    {:result-type :inline-at-cursor :verbatim true}))})

;;; core.typed/check-form-info annotator

(defn check-form [s]
  (str "
   (if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '" s ")))]
     (for [^Exception e res]
       (let [{:keys [env] :as data} (ex-data e)]
         (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\"
               (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\"
               (if (contains? data :form)
                 (str (:form data))
                 0) \"\n\"
               (str \"in: \" (:source env)) \"\n\"
               (str \"namespace: \" (-> env :ns :name str)) \"\n\n\")))
     (with-out-str (clojure.pprint/write (clojure.core.typed/cf " s "))))"))

(cmd/command {:command :typedclojure.check.form
              :desc "Typed Clojure: check var or form"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    {:string (ed/selection e) :selection true}
                                    (->token* e c))]
                        (cond
                         (or (:boundary token)
                             (:whitespace token)) (let [[start end] (par/form-boundary e (:at token) nil)
                                                        form (ed/range e start (ed/adjust-loc end 1))]
                                                    (raise* e (check-form form) :res :inline-at-cursor))
                         (:orphan token)          (notifos/set-msg! "core.typed can only check vars or forms")
                         :else                    (raise* e (check-form (:string token)) :res :inline-at-cursor))))})
