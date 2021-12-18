(ns advent-of-code-2021.09.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(defn parse-input [lines]
  (mapv (fn [line] (mapv #(Integer/parseInt %) (str/split line #""))) lines))

(def example (parse-input ["2199943210"
                           "3987894921"
                           "9856789892"
                           "8767896789"
                           "9899965678"]))

(def input (parse-input (read-lines "src/advent_of_code_2021/09/input.txt")))

(defn get-neighbors [x y max-x max-y]
  (->> [[0 -1] [-1 0] [1 0] [0 1]]          ; Up, left, right, and down
       (map (fn [[i j]] [(+ x i) (+ y j)]))  ;   from the original coordinates
       (filter (fn [[i j]] (and (>= i 0)     ;   if within the bounds of the matrix.
                               (>= j 0)
                               (<= i max-x)
                               (<= j max-y))))))

#_(get-neighbors 0 0 12 12)

(defn lowest?
  "Given a heightmap and a coordinate, return true if that point is lower than it's neighbors"
  [hm x y]
  (let [max-y (-> hm count dec)        ; Find index of last row
        max-x (-> hm first count dec)  ; Find index of last column
        height (get-in hm [y x])       ; Get height of current point
        neighbors (->> (get-neighbors x y max-x max-y)  ; Get surrounding heights
                       (map (fn [[i j]] (get-in hm [j i]))))]
    (every? #(> % height) neighbors)))

#_(lowest? example 1 0)

(defn find-low-points
  "Given a heightmap, find all points that are lower than their adjacent neighbors"
  [hm]
  (let [rows (count hm)
        cols (count (first hm))]
    ;; Compose list of coordinates in matrix
    (for [y (range rows)
          x (range cols)
          ;; But filter out the lowest points
          :when (lowest? hm x y)] [x y])))

#_(find-low-points example)

(defn find-risk-level
  [in]
  (->> (find-low-points in)
       (map (fn [[x y]] (get-in in [y x])))
       (reduce #(+ %1 1 %2) 0)))

#_(println "Day 09 - Part 1: " (find-risk-level input))
