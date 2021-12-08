(ns advent-of-code-2021.08.part1
  (:require [advent-of-code-2021.io :refer [readInput]]
            [clojure.string :as str]))

(def example (readInput "src/advent_of_code_2021/08/example.txt"))

(def input (readInput "src/advent_of_code_2021/08/input.txt"))

(defn run [in]
  (let [digits (map #(-> %
                   (str/split #" \| ")
                   (nth 1)
                   (str/split #" "))
                    in)]
    (->> digits
         (flatten)
         (filter #(case (count %) ; count # of segments that create:
                    2 true        ; digit 1
                    4 true        ; digit 4
                    3 true        ; digit 7
                    7 true        ; digit 8
                    false))       ; filter out other digits
         (count))))

(run input)
