(ns advent-of-code-2021.07.part1
  (:require [advent-of-code-2021.io :refer [read-ints]]
            [clojure.string :as str]))

;;; From 0 -> 16, median is 2
(def example [16 1 2 0 4 2 7 1 2 14])

;;; From 0 -> 1896, median is 325
(def input (read-ints "src/advent_of_code_2021/07/input.txt"))

(defn median
  "Given a vector of integers, return the median number"
  [coll] (nth (sort coll) (quot (count coll) 2)))

(defn move-to-position
  "Given a vector of horizontal positions and a target position,
  return the amount of fuel used for each item to get to the target"
  [target coll]
  (map (fn [x] (if (< x target) (- target x) (- x target))) coll))

(defn run [positions]
  (reduce + (move-to-position (median positions) positions)))

#_(println "Day 07 - Part 1: " (run input))
