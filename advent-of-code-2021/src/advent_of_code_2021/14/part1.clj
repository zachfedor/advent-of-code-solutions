(ns advent-of-code-2021.14.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(defn parse-input [in]
  (let [lines (read-lines in)]
    {:template (str/trim (first lines))
     :rules (->> lines
                 (filter #(str/includes? % "->"))
                 (map #(str/split % #" -> "))
                 (into {}))}))

(def example (parse-input "src/advent_of_code_2021/14/example.txt"))

(def input (parse-input "src/advent_of_code_2021/14/input.txt"))

(defn zip-triplets
  "Given a collection of 3 char strings, zipper them together with overlaps"
  [coll]
  (apply str
         (first coll)
         (map #(apply str (rest %)) (rest coll))))

#_(zip-triplets ["NCN" "NBC" "CHB"])

(defn split-pairs
  "Given a string, split it into a collection of overlapping pairs"
  [s]
  (for [i (range (dec (count s)))] ;; Create index range to second to last letter
    (str (nth s i) (nth s (inc i)))))

#_(split-pairs "NCNBCHB")

(defn insert
  "Given a pair of characters, return the converted string according to rules"
  [rules s]
  (str (first s) (get rules s "") (second s)))

#_(insert (:rules example) "NN")

(defn insertion-step
  [rules template]
  (->> template
       split-pairs
       (mapv #(insert rules %))
       zip-triplets))

#_(insertion-step (:rules example) (:template example))

(defn polymer-quantity
  [template]
  (as-> template in
    (frequencies in)
    (vals in)
    (sort in)
    (- (last in) (first in))))

(defn run [in steps]
  (loop [template (:template in)
         n 0]
    (if (>= n steps) template
        (recur (insertion-step (:rules in) template) (inc n)))))

#_(println "Day 14 - Part 1: " (polymer-quantity (run input 10)))
