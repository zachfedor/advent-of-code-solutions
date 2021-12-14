(ns advent-of-code-2021.13.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(defn parse-input [in]
  (let [lines (read-lines in)]
    {:dots (->> lines
                (filter #(str/includes? % ","))
                (map (fn [l] (mapv #(Integer/parseInt %) (str/split l #","))))
                (set))
     :folds (->> lines
                 (filter #(str/includes? % "fold"))
                 (mapv #(re-find #"(\w*)=(\d*)" %))
                 (mapv (fn [[_ a b]] [a (Integer/parseInt b)])))}))

(def example (parse-input "src/advent_of_code_2021/13/example.txt"))

(def input (parse-input "src/advent_of_code_2021/13/input.txt"))


(defn fold-point
  "Given a point at `x` and `y`, calculate new coords when folded along an axis"
  [coords [axis fold]]
  (let [c (if (= axis "x") (first coords) (second coords))
        idx (if (= axis "x") 0 1)]
    (if (< c fold) coords
        (assoc coords idx (- (* 2 fold) c)))))

#_(fold-point [6 6] ["y" 4])

(defn fold-set
  "Given a set and a fold instruction, return the folded set"
  [dots [axis fold]]
  (->> dots
       (map #(fold-point % [axis fold]))
       (set)))

(defn run [in]
  (count (fold-set (:dots in) (first (:folds in)))))

(println "Day 13 - Part 1: " (run input))
