(ns advent-of-code-2021.06.part2
  (:require [advent-of-code-2021.06.part1 :as part1
             :refer [example input]]
            [clojure.string :as str]))

(defn build-freq
  "Given string of timers, build a vector containing the frequencies of each possible day
  `[0 n0, 1 n1, ... 8 n8]` where nX is the number of fish at day x"
  [in]
  (vec (for [x (range 9)]
         (get (frequencies in) x 0))))

(defn update-timers
  "Given a vector of timers, return an updated map for the next cycle"
  [timers]
  (let [new (nth timers 0)] ;; Save the amount of new fish to be created
    (as-> timers in
        (rest in) ;; Decrement index of each timer by removing the first item
        (vec in) ;; Convert rest list back into vector
        (assoc in 6 (+ (nth in 6) new)) ;; Reset the day 0 fish, adding them to day 6
        (conj in new)))) ;; Add newly created fish to end of vector as day 8s

;; (update-timers (build-freq example))

(defn run [initial days]
  (def days-left (atom days))
  (def timers (atom (build-freq initial)))

  (while (pos? @days-left)
    (swap! timers update-timers)
    (swap! days-left dec))

  (reduce + @timers))

;; (println "Day 06 - Part 2: " (run input 256))
