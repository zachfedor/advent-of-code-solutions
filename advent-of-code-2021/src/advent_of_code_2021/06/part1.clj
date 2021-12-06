(ns advent-of-code-2021.06.part1
  (:require [advent-of-code-2021.io :refer [readInput]]
            [clojure.string :as str]))

(def example "3,4,3,1,2")

(def input (first (readInput "src/advent_of_code_2021/06/input.txt")))

(defn parse-input [in]
  (map #(Integer/parseInt %) (str/split in #",")))

(defn update-timers
  "Given a vector of strings, update each timer"
  [timers] (map (fn [t] (if (= 0 t) 6 (dec t))) timers))

(update-timers '(3 4 3 1 2))

(defn get-new-fish
  "Given a vector of strings, return the appropriate amount of new timers"
  [timers] (repeat
            (get (frequencies timers) 0 0) ; Build frequency map of timers and pull out count of 0s, defaulting to 0
            8)) ; New fish start at 8

(get-new-fish '(2 3 4 2 0 3 0 4))

(defn run [initial days]
  (def days-left (atom days))
  (def timers (atom (parse-input initial)))
  (def new-fish (atom '()))

  (while (pos? @days-left)
    ;; (println @timers)
    (reset! new-fish (get-new-fish @timers))
    (def updates (update-timers @timers))
    (reset! timers (concat updates @new-fish))
    (swap! days-left dec))

  (count @timers))
