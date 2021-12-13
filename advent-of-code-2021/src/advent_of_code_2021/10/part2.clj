(ns advent-of-code-2021.10.part2
  (:require [advent-of-code-2021.10.part1 :as part1 :refer [example input]]
            [clojure.string :as str]))

(defn find-incompletes
  "Given a line, remove matching brackets and return list of incomplete openers"
  [line]
  (let [c (part1/first-closer line)
        idx-c (str/index-of line (str c))
        o (part1/match-bracket c)
        idx-o (dec idx-c)]
    ;; We've matched all the closing brackets, return list of extra openers
    (if (nil? c) line
        ;; Otherwise, remove current matching pair from the line and run again
        (find-incompletes (part1/str-splice line idx-o (inc idx-c))))))

#_(find-incompletes (first example))

(defn complete-line
  "Given a string of opening brackets, return their closing string"
  [incompletes]
  (->> incompletes
      (map part1/match-bracket)
      (reverse)
      (apply str)))

#_(complete-line "(([{{<")

(defn score-line
  "Given a string of closing brackets, return their point value"
  [closers]
  (reduce (fn [acc c]
            (+ (* acc 5)
               (case c \) 1 \] 2 \} 3 \> 4)))
          0 closers))

#_(score-line "])}>")

(defn run [lines]
  (let [results (->> lines
                     (filter #(nil? (part1/find-corruption %)))
                     (map find-incompletes)
                     (map complete-line)
                     (map score-line)
                     (sort))
        num (count results)
        mid (Math/floor (/ num 2))]
    (nth results mid)))

#_(println "\nDay 10 - Part 2: " (run input))
