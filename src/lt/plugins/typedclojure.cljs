(ns lt.plugins.typedclojure
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as ed]
            [lt.objs.notifos :as notifos]
            [lt.plugins.paredit :as par])
  (:require-macros [lt.macros :refer [behavior]]))


;;;; cursor manipulation addenda ;;;;

;;; To meet the requirements of our factoring functions, we supplement
;;; LT and LT-Paredit functionality with a new command that behaves roughly
;;; as Emacs' beginning-of-defun.

(defn adjust-line [loc dir]
  (when loc
    (update-in loc [:line] + dir)))

(defn seek-top [ed loc]
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

(defn form? [e loc]
  ;; TODO: handle case where loc is out of form by one column
  (let [[start end] (par/form-boundary e loc nil)]
  (if (or (not= [nil nil] (par/form-boundary e loc nil))
          (not= [nil nil] (par/form-boundary e (ed/adjust-loc loc -1) nil))
          (not= [nil nil] (par/form-boundary e (ed/adjust-loc loc 1) nil)))
    true
    false)))

(cmd/command {:command :typedclojure.pseudoparedit.top
              :desc "Typed Clojure: move cursor to top level"
              :hidden true ;; remove this to make the command visible in the command bar
              :exec (fn [type]
                      (when-let [ed (pool/last-active)]
                        (when (or (not (::orig-pos @ed))
                                  (ed/selection? ed))
                          (object/merge! ed {::orig-pos (ed/->cursor ed)}))
                        (-> (par/ed->info ed)
                            (move-top :left)
                            (par/batched-edits))))})


;;;; clj functions for eval ;;;;

(def typed-alias "
  (if-let [[a typedns] (first (filter #(= (find-ns 'clojure.core.typed)
                                          (val %))
                                       (ns-aliases *ns*)))]
    (str a \"/\")
    (str \"clojure.core.typed/\"))")

(defn aliased<- [f]
  (str typed-alias " " (pr-str f)))

(defn qualified<- [var]
  ;; Identical to typed-clojure-mode
  ;; FIXME: return something useful when failing
  (str "
       (let [s '" var "
             ^clojure.lang.Var v (when (symbol? s) (resolve s))]
         (cond
          ; if unresolved just insert whatever is given
          (not (var? v))
          (when (symbol? s) (str s))
          ; fully qualify all vars outside current namespace
          ; also add :no-check prefix
          (not= *ns* (.ns v))
          (str \"^:no-check \"
               (symbol (str (ns-name (.ns v)))
                       (str (.sym v))))
          :else
          (str (name (symbol s)))))"))


;;;; annotation commands ;;;;

;;; TODO:
;;;   - Improve form/var selection.
;;;   - Move cursor to |Any.
;;;   - Handle errors.

(cmd/command {:command :typedclojure.ann.var
              :desc "Typed Clojure: annotate var"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)]
                          (let [token (if (ed/selection? e)
                                        (ed/selection e)
                                        (:string (ed/->token e c)))
                                ->ann-var (str  "(str \"(\""
                                                (aliased<- "ann")
                                                "\" \""
                                                (qualified<- token)
                                                "\" Any)\""
                                                ")")]
                            (do
                              (cmd/exec! :typedclojure.pseudoparedit.top)
                              (ed/insert-at-cursor e "\n")
                              (ed/move-cursor e
                                              (adjust-line (ed/->cursor e) -1))
                              (object/raise e
                                            :eval.custom
                                            ->ann-var
                                            {:result-type :replace :verbatim true})))))})


(cmd/command {:command :typedclojure.ann.form
              :desc "Typed Clojure: annotate form"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)]
                        (if-not (form? e c)
                          (notifos/set-msg! "Typed Clojure: you need to be within a form to annotate it"
                                            {:timeout 5000 :class "error"})
                          (let [e (pool/last-active)
                                ->ann-form (str  "(str \"(\""
                                                 (aliased<- "ann-form")
                                                 "\" \""
                                                 "__SELECTION*__"
                                                 "\" Any)\""
                                                 ")")]
                            (do
                              (cmd/exec! :paredit.select.parent)
                              (object/raise e
                                            :eval.custom
                                            ->ann-form
                                            {:result-type :replace :verbatim true}))))))})


;;;; checking commands ;;;;

;;; TODO:
;;;   - Find a way to access custom eval results programmatically, in order to
;;;     parse and better display them.

;;; NOTE: ns-checker and check-form are one-line because :result-type :inline
;;;       doesn't handle newlines in the stringified function.

(def ns-checker
  "(let [_ (require 'clojure.core.typed) check-ns-info (find-var 'clojure.core.typed/check-ns-info) _ (assert check-ns-info \"clojure.core.typed/check ns-info not found\") {:keys [delayed-errors]} (check-ns-info)] (if (seq delayed-errors) (for [^Exception e delayed-errors] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"  \" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) \"No type errors found.\"))")

(cmd/command {:command :typedclojure.check.ns
              :desc "Typed Clojure: check namespace"
              :exec (fn []
                      (object/raise (pool/last-active)
                                    :eval.custom
                                    ns-checker
                                    {:result-type :inline :verbatim true}))})

(defn check-form [s]
  (str
    "(if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '" s ")))] (for [^Exception e res] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) (with-out-str (clojure.pprint/write (clojure.core.typed/cf " s "))))"))

(cmd/command {:command :typedclojure.check.form
              :desc "Typed Clojure: check var or form"
              :exec (fn []
                      (let [e (pool/last-active)
                            c (ed/->cursor e)
                            token (if (ed/selection? e)
                                    (ed/selection e)
                                    (:string (ed/->token e c)))]
                        (object/raise (pool/last-active)
                                      :eval.custom
                                      (check-form token)
                                      {:result-type :inline :verbatim true})))})
