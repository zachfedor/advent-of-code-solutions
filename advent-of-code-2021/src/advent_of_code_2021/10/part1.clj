(ns advent-of-code-2021.10.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(def example ["[({(<(())[]>[[{[]{<()<>>"
              "[(()[<>])]({[<{<<[]>>("
              "{([(<{}[<>[]}>{[]{[(<()>"
              "(((({<>}<{<{<>}{[]{[]{}"
              "[[<[([]))<([[{}[[()]]]"
              "[{[{({}]{}}([{[{{{}}([]"
              "{<[[]]>}<{[{[{[]{()[[[]"
              "[<(<(<(<{}))><([]([]()"
              "<{([([[(<>()){}]>(<<{{"
              "<{([{{}}[<[[[<>{}]]]>[]]"])

(def input (read-lines "src/advent_of_code_2021/10/input.txt"))

(defn closer?
  "Given a character, determine if it is a closing bracket"
  [c] (case c (\) \] \} \>) true false))

#_(closer? \))

(defn match-bracket
  "Given a bracket, return its matching partner or `nil`"
  [c] (case c \( \) \) \( \[ \] \] \[ \{ \} \} \{ \< \> \> \< nil))

#_(match-bracket \()

(defn str-splice
  "Given a string, cut out substring from start to end index"
  [s start end] (str (.substring s 0 start) (.substring s end)))

#_(str-splice "hello" 2 4)

(defn first-closer
  [line] (first (filter closer? line)))

#_(first-closer (first example))

(defn find-corruption
  "Given a line, recursively find a corrupted bracket."
  [line]
  (let [c (first-closer line)             ; Currently testing for closer `c`
        idx-c (str/index-of line (str c)) ;   at this index.
        o (match-bracket c)               ; Hoping to find the matching `o`
        idx-o (dec idx-c)]                ;   at index `idx-o`.
    ;; Base case 1: We've matched all the brackets in the line and found nothing
    (cond (or (empty? line) (nil? c)) nil
          ;; Base case 2: The opener doesn't match, return the closer
          (not= o (nth line idx-o)) c
          ;; Otherwise: Remove the matching brackets from the line and run
          ;; again with the next closers
          :else (find-corruption (str-splice line idx-o (inc idx-c))))))

(defn illegal-char-points
  [c] (case c \) 3 \] 57 \} 1197 \> 25137 nil))

(defn run
  []
  (->> input
       (map find-corruption)
       (filter some?)
       (map illegal-char-points)
       (reduce +)))

(println "Day 10 - Part 1: " (run))
