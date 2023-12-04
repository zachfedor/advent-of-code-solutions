(ns aoc-2023.02
  (:require [clojure.string :as str]))

(defn reveal-reducer
  "Convert a reveal (e.g. `['3 red']`) into a map of values (e.g. `{'red' 3}`)"
  [reveal]
  (reduce (fn [reveal-map current-reveal]
            (let [parts (str/split current-reveal #" ")
                  num (Integer/parseInt (first parts))
                  col (last parts)]
              (assoc reveal-map col num)))
          { "red" 0, "blue" 0, "green" 0 }
          reveal))

(defn parse-game
  "Split a game line into its id and a list of reveal maps"
  [line]
  (let [parts (str/split line #"[:;]")
        id (Integer/parseInt (str/replace (first parts) #"\D" ""))
        reveals (->> (nthrest parts 1)
                     (map str/trim)
                     (map (fn [l] (str/split l #", ")))
                     (map reveal-reducer))]
    ;; (println "id: " id ",  reveals: " reveals)
    { :id id :reveals reveals }))

(defn possible-reveal?
  "Determine if a reveal map is possible given the color limits"
  [reveal]
  (and (<= (reveal "red") 12) (<= (reveal "green") 13) (<= (reveal "blue") 14)))

(defn part1
  "Day 02 Part 1"
  [input]
  (->> (str/split input #"\n")
       (map parse-game)
       (map (fn [game] (assoc game :possible (every? possible-reveal? (game :reveals)))))
       (filter :possible)
       (map :id)
       (reduce +)))

(defn greatest-per-color
  [reveals]
  (reduce (fn
            [acc cur]
            {
             "red" (if (> (acc "red") (cur "red")) (acc "red") (cur "red"))
             "green" (if (> (acc "green") (cur "green")) (acc "green") (cur "green"))
             "blue" (if (> (acc "blue") (cur "blue")) (acc "blue") (cur "blue"))
             }
            ) reveals))

(defn part2
  "Day 02 Part 2"
  [input]
  (->> (str/split input #"\n")
       (map parse-game)
       (map :reveals)
       (map greatest-per-color)
       (map (fn [r] (* (r "red") (r "green") (r "blue"))))
       (reduce +)))
