(ns lt.plugins.typedclojure.cursor
  "Cursor manipulation addenda."
  (:require [lt.object :as object]
            [lt.objs.command :as cmd]
            [lt.objs.editor.pool :as pool]
            [lt.objs.editor :as ed]
            [lt.plugins.paredit :as par]))


(defn post-ann-boundary [editor bound]
  (let [loc (ed/adjust-loc (ed/->cursor editor) -1)
        [start end] (par/form-boundary editor loc nil)]
    (if (= :start bound)
      start
      end)))

(defn move-relative
  "Given an editor, a cursor, and a location offset {:line n :ch m}, move
   the cursor to a new location."
  [e cursor {:keys [line ch] :or [line 0 ch 0] :as offset}]
  (let [new-pos (merge-with + cursor offset)]
    (ed/move-cursor e new-pos)))

(defn select-relative*
  "Given an editor, a location, and a vector of integers [start end], sets
   the selection from column (location + start) to column (location + end)"
  [e loc [start end]]
  (ed/set-selection e
                    (ed/adjust-loc loc start)
                    (ed/adjust-loc loc end)))

(defn select-relative [{:keys [editor sel rel] :or {sel [0 -3] rel :end}}]
  (let [loc (post-ann-boundary editor rel)]
    (select-relative* editor
                      loc
                      sel)))

(defn ->newline-above! [e loc]
  (cmd/exec! :typedclojure.pseudoparedit.top)
  (ed/insert-at-cursor e "\n")
  (ed/move-cursor e loc))


;;; To meet the requirements of our factoring functions, we supplement
;;; LT and LT-Paredit with a new command that behaves roughly as
;;; Emacs' beginning-of-defun. This will be removed when functionally
;;; equivalent patches land in the main releases.

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


;;;; public command

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
