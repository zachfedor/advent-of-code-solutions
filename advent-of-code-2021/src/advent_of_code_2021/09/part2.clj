(ns advent-of-code-2021.09.part2
  (:require [advent-of-code-2021.09.part1 :as part1 :refer [example input]]))

(defn get-basin
  "Given a lowpoint, walk orthogonal points to return a list of adjacent next-level points"
  [lowpoint matrix]
  (loop [basin #{}                                         ; The basin of points
         { h :height x :x y :y } lowpoint                  ; The current lowpoint
         next-hs (->> (part1/get-neighbors x y matrix)     ; Get list of orthogonal points
                      (filter #(= (inc h) (:height %))))]  ; Keep if one-level higher than current
    (println h (map :height next-hs))
    (if (or (empty? next-hs) (= h 8))
      ;; Base case: There are no neighbors one-level up or we're at the max height
      ;; basin
      ;; Otherwise, conjoin the basins of each next-level neighbor
      (as-> next-hs in
        (map #(get-basin % matrix) in))

      (flatten (conj  { :height h :x x :y y })))))

(defn run []
  (get-basin (second (part1/find-low-points example)) example))

(count (run))

(println "\nDay 09 - Part 1: " (run))
