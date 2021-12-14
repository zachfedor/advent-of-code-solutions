(ns advent-of-code-2021.13.part2
  (:require [advent-of-code-2021.13.part1 :as part1 :refer [example input]]
            [clojure.string :as str]))

(defn pprint-map
  "Given a collection of coords, print them on a 2d plane"
  [coll]
  (let [height (last (sort (map second coll)))
        width (last (sort (map first coll)))
        grid (for [y (range (inc height))]
               (for [x (range (inc width))]
                 (if (some #(= [x y] %) coll) "#" " ")))]
    (println (str/join (map #(apply str "\n" %) grid)))))

#_(pprint-map #{[0 0] [1 1] [2 2]})

(defn run [in]
  (def folds (atom (:folds in)))
  (def dots (atom (:dots in)))

  (while (not (empty? @folds))
    (swap! dots part1/fold-set (first @folds))
    (swap! folds rest))
  (pprint-map @dots))

#_(run input)
