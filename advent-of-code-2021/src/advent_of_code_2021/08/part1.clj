(ns advent-of-code-2021.08.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(def example (read-lines "src/advent_of_code_2021/08/example.txt"))

(def input (read-lines "src/advent_of_code_2021/08/input.txt"))

(defn run [in]
  (let [digits (map #(-> %
                   (str/split #" \| ")
                   (nth 1)
                   (str/split #" "))
                    in)]
    (->> digits
         (flatten)
         (filter #(case (count %) ; Count # of segments that create:
                    2 true        ;   digit 1
                    4 true        ;   digit 4
                    3 true        ;   digit 7
                    7 true        ;   digit 8
                    false))       ; Filter out other digits
         (count))))

#_(println "Day 08 - Part 1: " (run input))
