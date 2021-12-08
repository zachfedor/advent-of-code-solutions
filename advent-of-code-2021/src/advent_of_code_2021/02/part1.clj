(ns advent-of-code-2021.02.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(def example '(["forward" 5]
               ["down" 5]
               ["forward" 8]
               ["up" 3]
               ["down" 8]
               ["forward" 2]))

(def input
  (->> (read-lines "src/advent_of_code_2021/02/input.txt")
       (map #(str/split % #" "))
       (map #(vector (first %) (Integer/parseInt (second %))))))

(defn calculate-location
  "Given a list of steps making up the sub's course, calculate it's final
  location at [horizontal depth] position starting from [0 0]"
  [course]
  (reduce
   (fn [[x y] [heading dist]]
     (case heading
       "forward" [(+ x dist) y] ; Increase horizontal position
       "down" [x (+ y dist)]    ; Increase depth
       "up" [x (- y dist)]))    ; Decrease depth
   [0 0] course))

(defn final-vector [[hpos dpos]] (* hpos dpos))

#_(println "Day 02 - Part 1: " (final-vector (calculate-location input)))
