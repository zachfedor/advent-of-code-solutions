(ns advent-of-code-2021.15.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [advent-of-code-2021.09.part2 :refer [queue]]))

(defn find-path [in]
  (let [lines (read-lines in)                ; Get vector of lines from filepath.
        rows (-> lines count)                ; Find max of y axis.
        cols (-> lines first count)          ; Find max of x axis.
        end [(dec cols) (dec rows)]          ; Find coordinates of final point.
        graph (into {} (for [y (range rows)  ; Compose map containing all points in map.
                             x (range cols)]
                         [[x y]                 ; Key is this point's coordinate pair.
                          { :weight (->> [y x]  ; Value is a map containing this point's weight,
                                         (get-in lines) ; that is the value at this coordinate
                                         str Integer/parseInt), ; cast to an integer,
                           :dist ##Inf }]))])   ; and the distance traveled to get to this point
                                                ; where a value of `##Inf` means it is unvisited.
  (loop [current [0 0]]
    ;; get current
    ))

(def example (build-graph "src/advent_of_code_2021/15/example.txt"))

(def input (build-graph "src/advent_of_code_2021/15/input.txt"))

(println "target" ())
