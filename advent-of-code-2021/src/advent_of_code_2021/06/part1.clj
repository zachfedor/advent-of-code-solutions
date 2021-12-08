(ns advent-of-code-2021.06.part1
  (:require [advent-of-code-2021.io :refer [read-ints]]
            [clojure.string :as str]))

(def example "3,4,3,1,2")

(def input (read-ints "src/advent_of_code_2021/06/input.txt"))

(defn update-timers
  "Given a vector of integers, update each timer by decrementing or reseting it"
  [timers] (mapv (fn [t] (if (= 0 t) 6 (dec t))) timers))

#_(update-timers [3 4 3 1 2])

(defn get-new-fish
  "Given a vector of integers, return the appropriate amount of new timers"
  [timers] (repeat
            ;; Build frequency map of timers and pull out count of 0s, defaulting to 0
            (get (frequencies timers) 0 0)
            ;; New fish start at 8
            8))

#_(get-new-fish [2 3 4 2 0 3 0 4])

(defn run [initial days]
  (def days-left (atom days))
  (def timers (atom initial))
  (def new-fish (atom '()))

  (while (pos? @days-left)
    #_(println @timers)
    (reset! new-fish (get-new-fish @timers))
    (def updates (update-timers @timers))
    (reset! timers (concat updates @new-fish))
    (swap! days-left dec))

  (count @timers))

#_(println "Day 06 - Part 1: " (run input 80))
