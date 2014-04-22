(ns lt.plugins.typedclojure.token
  "Token and form detection addenda."
  (:require [lt.objs.editor :as ed]
            [clojure.string :as string]
            [lt.objs.editor.pool :as p]))

(defn ->token [e loc]
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

(defn bounds [e loc]
  (let [token (ed/->token e loc)
        ln (:line loc)]
    [{:line ln :ch (:start token)}
     {:line ln :ch (:end token)}]))
