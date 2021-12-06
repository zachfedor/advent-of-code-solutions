(ns advent-of-code-2021.02.part1
  (:require [clojure.string :as str]))

(def example '(["forward" 5]
               ["down" 5]
               ["forward" 8]
               ["up" 3]
               ["down" 8]
               ["forward" 2]))

(def input
  (map (fn [[heading dist]] [heading (Integer/parseInt dist)])
  (map (fn [step] (str/split step #" "))
   (advent-of-code-2021.io/readInput "src/advent_of_code_2021/02/input.txt"))))

(defn calculateLocation [course]
  ; Given a list of steps making up the sub's course, calculate it's final
  ; location at [horizontal depth] position starting from [0 0]
  (reduce
   (fn [[x y] [heading dist]]
     (case heading
       "forward" [(+ x dist) y] ; increase horizontal position
       "down" [x (+ y dist)]    ; increase depth
       "up" [x (- y dist)]))    ; decrease depth
   [0 0] course))

(defn finalVector [[hpos dpos]] (* hpos dpos))

(finalVector (calculateLocation input))
