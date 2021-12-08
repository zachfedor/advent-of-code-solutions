(ns advent-of-code-2021.05.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(def example ["0,9 -> 5,9"
              "8,0 -> 0,8"
              "9,4 -> 3,4"
              "2,2 -> 2,1"
              "7,0 -> 7,4"
              "6,4 -> 2,0"
              "0,9 -> 2,9"
              "3,4 -> 1,4"
              "0,0 -> 8,8"
              "5,5 -> 8,2"])

(def input (read-lines "src/advent_of_code_2021/05/input.txt"))

(defn is-ortho?
  "Given start and end coordinates, return true if the line is horizontal or vertical"
  [[x1 y1] [x2 y2]] (or (= x1 x2) (= y1 y2)))

(defn create-lines
  "Given vector of strings, return start and end coordinates"
  [strings]
  (map (fn [string] (as-> string in
          (str/replace in #" -> " ",")
          (str/split in #",")
          (map (fn [s] (Integer/parseInt s)) in)
          (partition 2 in)))
       strings))

(defn range-inclusive
  "Given two integers, return a vector including all numbers in between"
  [x y] (range x                            ; Start at the first number
                 (if (< x y) (inc y) (dec y)) ; Modify the end to include second number
                 (if (< x y) 1 -1)))          ; Determine if we're counting up or down

(defn compose-coords
  "Given start and end coordinates, compose all the coordinates within
  NOTE: this assumes coordinates are in a straight line"
  [[[x1 y1] [x2 y2]]]
  (if (= x1 x2)
    (for [y (range-inclusive y1 y2)] [x1 y])   ; Horizantal line, find all y values
    (for [x (range-inclusive x1 x2)] [x y1]))) ; Vertical line, find all x values

;; (compose-coords [[0 0] [5 0]])

(defn fill-board
  "Given a list of lines, a vector of start and end coordinates,
  create a flat list of all points"
  [composer lines] (partition 2 (flatten (map composer lines))))

(defn find-dup-coords
  "Given a list of coordinates, return list containing coordinates that were duplicates"
  [coords]
  (for [[coord freq] (frequencies coords)
        :when (> freq 1)]
    coord))

(defn run [in]
  (let [lines (filter #(apply is-ortho? %) (create-lines in))]
    (count (find-dup-coords (fill-board compose-coords lines)))))

;; (println "Day 05 - Part 1: " (run input))
