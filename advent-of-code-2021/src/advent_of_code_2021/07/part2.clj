(ns advent-of-code-2021.07.part2
  (:require [advent-of-code-2021.07.part1 :as part1 :refer [example input]]))

(defn abs [n] (max n (- n)))

(defn calc-fuel
  "Given a start and end position, return the amount of fuel used for the move"
  [start end]
  (reduce + (for [x (range (inc (abs (- end start))))] x)))

(defn move-to-position
  "Given a vector of horizontal positions and a target position,
  return the amount of fuel used for each item to get to the target"
  [target coll]
  (map (fn [x] (calc-fuel x target)) coll))

(defn run [positions]
  (let [sorted (sort positions)
        min-pos (first sorted)
        max-pos (last sorted)]
    (->> (for [pos (range min-pos max-pos)] pos)
      (map #(reduce + (move-to-position % positions)))
      (sort)
      (first))))

;; (println "Day 07 - Part 2: " (run input))
