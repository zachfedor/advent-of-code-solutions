(ns advent-of-code-2021.02.part2
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

(defn finalVector [[hpos dpos]] (* hpos dpos))

(println (finalVector (calculateLocation input)))
