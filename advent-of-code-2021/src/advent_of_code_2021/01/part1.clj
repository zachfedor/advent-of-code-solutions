(ns advent-of-code-2021.01.part1)

(def example [199 200 208 210 200 207 240 269 260 263])

(def input (advent-of-code-2021.io/read-linesn "src/advent_of_code_2021/01/input.txt"))

(defn is-increase? [accumulator current]
  (let [[previous increases] accumulator]
    (if (= previous nil)
        [current 0]
        [current (+ increases (if (> current previous) 1 0))])))

(defn count-increases [measures]
  (second (reduce is-increase? [] measures)))

;; (println "Day 01 - Part 1: " (count-increases input))
