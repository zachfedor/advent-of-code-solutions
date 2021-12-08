(ns advent-of-code-2021.02.part2
  (:require [advent-of-code-2021.02.part1 :refer [example input]]
            [clojure.string :as str]))

(defn calculate-location [course]
  ; Given a list of steps making up the sub's course, calculate it's final location
  ; at [horizontal depth] position starting from [0 0 0] where the last value is
  ; the sub's aim.
  (reduce
   (fn [[x y aim] [heading dist]]
     (case heading
       "forward" [(+ x dist) (+ y (* aim dist)) aim]  ; increase horizontal position and depth
       "down" [x y (+ aim dist)]                      ; increase aim
       "up" [x y (- aim dist)]))                      ; decrease aim
   [0 0 0] course))

(defn final-vector [[hpos dpos]] (* hpos dpos))

;; (println "Day 02 - Part 2: " (final-vector (calculate-location input)))
