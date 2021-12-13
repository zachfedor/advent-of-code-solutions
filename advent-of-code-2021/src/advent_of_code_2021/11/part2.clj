(ns advent-of-code-2021.11.part2
  (:require [advent-of-code-2021.11.part1 :as part1 :refer [example input]]))

(defn synced-flashes?
  [cmap] (every? #(= 0 (second %)) cmap))

#_(synced-flashes? {:a 0 :b 0 :c 0})

(defn find-synced-flashes
  [octopi]
  (println "\n===START===")
  (loop [step 0
         current octopi]
    (cond (>= step 1000) nil
          (synced-flashes? current) step
          :else (recur (inc step) (part1/step-thru current)))))

(println "\nSteps:" (find-synced-flashes input))
