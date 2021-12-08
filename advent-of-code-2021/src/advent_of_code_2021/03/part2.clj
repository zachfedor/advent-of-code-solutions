(ns advent-of-code-2021.03.part2
  (:require [advent-of-code-2021.03.part1 :refer [example input]]))

(defn verify-life-support-rating [o2-gen co2-scrub]
  (* (Integer/parseInt o2-gen 2) (Integer/parseInt co2-scrub 2)))

(defn get-nth-bits
  "Given array of `strings`, return array of characters in a certain `position`"
  [strings position]
  (map (fn [s] (nth s position)) strings))

;; (get-nth-bits '("101" "001" "101") 0)

(defn filter-bit-criteria
  "Given array of strings, return subset of strings where character at `pos` matches `bit`"
  [strings pos bit]
  (filter (fn [s] (= bit (nth s pos))) strings))

;; (filter-bit-criteria example 0 \1)

(defn find-bit-freqs
  "Given array of `characters`, return vector of frequencies of '0' and '1' characters"
  [characters]
  (reduce (fn [[zeros ones] char]
            [(+ zeros (if (= char \0) 1 0))
             (+ ones (if (= char \1) 1 0))])
          [0 0] characters))

;; (find-bit-freqs (get-nth-bits '("101" "001" "101") 0))

(defn find-most-common
  "Given frequency map, return the most common character, or `\1`"
  [[zeros ones]]
  (if (> zeros ones) \0 \1))

(defn find-least-common
  "Given frequency map, return the least common character, or `\0`"
  [[zeros ones]]
  (if (<= zeros ones) \0 \1))

;; (find-most-common (find-bit-freqs (get-nth-bits '("101" "001" "101") 0)))

(defn find-rating [comp report idx]
  (if (= 1 (count report))
    ; Base case: there's only one remaining string so return it
    (nth report 0)
    ; Otherwise, repeat the process considering the next bit to the right
    (find-rating
     comp
     ; Find all matching strings that match the most common bit
     (filter-bit-criteria report
                          idx
                          (comp (find-bit-freqs (get-nth-bits report idx))))
     ; Increase index by one to look at the next bit
     (+ idx 1))))

(defn run [in]
  (verify-life-support-rating
   (find-rating find-most-common in 0)    ; Oxygen Generator Rating
   (find-rating find-least-common in 0))) ; CO2 Scrubber Rating

;; (println "Day 03 - Part 2: " (run input))
