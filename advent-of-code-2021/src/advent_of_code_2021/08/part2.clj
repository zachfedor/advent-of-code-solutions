(ns advent-of-code-2021.08.part2
  (:require [advent-of-code-2021.08.part1 :refer [example input]]
            [clojure.string :as str]
            [clojure.set :refer [difference]]))

(defn parse-line [line]
  (as-> line l
          (str/split l #" \| ")  ; Divide line in half
          (map (fn [half] (str/split half #" ")) l)))  ; Split each half into list of words

(defn of-count
  "Given a number, return a function to test an items length against it"
  [n] #(= n (count %)))

(defn str-diff
  "Given two or more strings, return any characters included in the first but not the rest"
  [s1 & s2] (apply difference (set s1) (map set s2)))

(defn str-sort
  "Given a string, return new string sorted by characters"
  [s] (apply str (sort s)))

(defn solve-line [[segments output]]
  ;; Get known digits by their length first
  (let [digit1 (first (filter (of-count 2) segments))
        digit4 (first (filter (of-count 4) segments))
        digit7 (first (filter (of-count 3) segments))
        digit8 (first (filter (of-count 7) segments))
        ;; Then collect remaining into groups by length
        digs-of-6 (filter (of-count 6) segments)
        digs-of-5 (filter (of-count 5) segments)
        ;; Segment A exists on digit 7 but not digit 1
        segA (first (str-diff digit7 digit1))
        ;; Digit 9 is a 6n pattern that contains all four segments from digit 4
        digit9 (first (filter #(= 2 (count (str-diff % digit4))) digs-of-6))
        ;; Segment G exists on digit 9 but not digit 4 and isn't segment A
        segG (first (str-diff digit9 digit4 (str segA)))
        ;; Digit 3 is a 5n pattern that contains all three segments from digit 7 and segment G
        digit3 (first (filter #(= 1 (count (str-diff % digit7 (str segG)))) digs-of-5))
        ;; Segment D exists on digit 3 but not digit 7 and isn't segment G
        segD (first (str-diff digit3 digit7 (str segG)))
        ;; Digit 6 is a 6n pattern that isn't digit 9 and contains segment D
        digit6 (first (filter #(and (not= % digit9) (str/includes? % (str segD))) digs-of-6))
        ;; Digit 0 is the only remaining 6n pattern
        digit0 (first (filter #(and (not= % digit9) (not= % digit6)) digs-of-6))
        ;; Segment B exists on digit 9 but not digit 3
        segB (first (str-diff digit9 digit3))
        ;; Digit 5 is a 5n pattern that isn't digit 3 and containst segment B
        digit5 (first (filter #(and (not= % digit3) (str/includes? % (str segB))) digs-of-5))
        ;; Digit 2 is the only remaining 5n pattern
        digit2 (first (filter #(and (not= % digit3) (not= % digit5)) digs-of-5))
        digits (map str-sort [digit0 digit1 digit2 digit3 digit4 digit5 digit6 digit7 digit8 digit9])]
    (Integer/parseInt (apply str
                             (map (fn [current]
                                    (.indexOf digits (str-sort current)))
                                  output)))))

(defn run [in]
  (->> in
     (map parse-line)
     (map solve-line)
     (reduce +)))

#_(println "Day 08 - Part 2: " (run input))
