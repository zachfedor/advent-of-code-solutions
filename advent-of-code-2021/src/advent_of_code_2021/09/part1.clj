(ns advent-of-code-2021.09.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(defn parse-input [lines]
  (map (fn [line] (map #(Integer/parseInt %) (str/split line #""))) lines))

(def example (parse-input ["2199943210"
                           "3987894921"
                           "9856789892"
                           "8767896789"
                           "9899965678"]))

(def input (parse-input (read-lines "src/advent_of_code_2021/09/input.txt")))

(defn lowest?
  "Given a vector of numbers, return true if the first is less than the rest"
  [{height :height neighbors :neighbors}] (every? #(> % height) (map :height neighbors)))

#_(lowest? {:height 1 :neighbors '({:height 2} {:height 3} {:height 4})})

(defn get-point
  "Given coordinates and a matrix, retrieve that point's height"
  [x y matrix]
  {:height (nth (nth matrix y) x) :x x :y y})

(defn get-neighbors
  [x y matrix]
  (let [max-x (dec (count (first matrix)))
        max-y (dec (count matrix))]
    (filter some? ; Filter out nil neighbors
            [(if (< 0 y) (get-point x (dec y) matrix))         ; Up
             (if (< 0 x) (get-point (dec x) y matrix))         ; Left
             (if (< x max-x) (get-point (inc x) y matrix))     ; Right
             (if (< y max-y) (get-point x (inc y) matrix))]))) ; Down

#_(get-neighbors 9 4 example)

(defn find-low-points
  "Given a matrix of heights, find all points that are lower than their adjacent neighbors"
  [heightmap]
  (->> heightmap
       (map-indexed
        (fn [y row]         ; For each row at index y
          (map-indexed
           (fn [x element]  ; For each element at index x
             {:height element
              :x x  :y y
              :neighbors (get-neighbors x y heightmap)})
           row)))
       (apply concat)
       (filter lowest?)))

#_(find-low-points example)

(defn find-risk-level
  [coll]
  (+ (count coll)
     (reduce + (map :height coll))))

(defn run []
  (find-risk-level (find-low-points input)))

#_(println "Day 09 - Part 1: " (run))
