(ns advent-of-code-2021.05.part2
  (:require [advent-of-code-2021.05.part1 :as part1
             :refer [example input create-lines range-inclusive]]))

(def lines (create-lines input))

(defn compose-coords
  "Given start and end coordinates, compose all the coordinates within
  NOTE: this allows for diagonal lines"
  [[[x1 y1] [x2 y2]]]
  (cond
    (= x1 x2) (for [y (range-inclusive y1 y2)] [x1 y]) ; Horizantal line, find all y values
    (= y1 y2) (for [x (range-inclusive x1 x2)] [x y1]) ; Vertical line, find all x values
    :else (let [xs (range-inclusive x1 x2)             ; Diagonal line, zip together both ranges
                ys (range-inclusive y1 y2)]
            (map-indexed (fn [idx x] [x (nth ys idx)]) xs))))

(compose-coords [[8 0] [0 8]])

(count (part1/find-dup-coords (part1/fill-board compose-coords lines)))
