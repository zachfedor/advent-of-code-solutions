(ns advent-of-code-2021.11.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(defn parse-input [lines]
  (map (fn [line] (map #(Integer/parseInt %) (str/split line #""))) lines))

(defn build-row
  [y row] (apply merge (map-indexed (fn [x item] {[x y] item}) row)))

#_(build-row 0 '("a" "b" "c"))

(defn build-map
  "Convert matrix of nested lists into coordinate map"
  [matrix] (apply merge (map-indexed build-row matrix)))

#_(build-map '(("a" "b") ("c" "d")))

(def example (build-map
              (parse-input
               (read-lines "src/advent_of_code_2021/11/example.txt"))))

(def input (build-map
            (parse-input
             (read-lines "src/advent_of_code_2021/11/input.txt"))))

(defn print-map
  "Utility function to pretty print a coordinate map"
  ([cmap] (print-map cmap 10))
  ([cmap width]
   (->> (for [y (range width)
              x (range width)]
          (cmap [x y]))
        (partition width)
        (map #(reduce str %))
        (reduce (fn [s r] (str s "\n" r)) "")
        (println))))

#_(print-map example)

(defn get-neighbor-coords
  "Given coordinates of a point in a `matrix`, return list neighboring points"
  [[x y]]
  (let [grid (for [y' (range (dec y) (+ y 2))
                   x' (range (dec x) (+ x 2))]
               [x' y'])]
    (remove (fn [[x' y']] (and (= x x') (= y y'))) grid)))

#_(get-neighbor-coords [10 10])

(defn update-keys
  "Given map `m`, apply `f` to each value of key in `ks`, or all keys, and return updated map"
  ([f m] (update-keys f m (keys m)))
  ([f m ks] (reduce (fn [m' k] (update m' k f)) m ks)))

#_(update-keys inc {:a 1 :b 2 :c 3} [:a :c])

(defn find-flasher
  "Return coords of first point with value greater than 9.
  NOTE: Also filters out points that have flashed but haven't been reset yet."
  [cmap] (ffirst (filter (fn [[k v]] (and (int? v) (> v 9))) cmap)))

#_(find-flasher {:a 1 :b 2 :c 10 :d 8 :e 10})

(defn handle-flasher
  [cmap flasher]
  (as-> flasher in
    (get-neighbor-coords in)      ;; Get list of neighbors' coords from cmap
    (filter #(some? (cmap %)) in) ;; Remove already flashed and out-of-bounds coords, i.e. val is nil
    (update-keys inc cmap in)     ;; Increase neighboring points by one
    (assoc in flasher nil)))      ;; Mark this point as already flashed

;;;; Cycle
(defn step-thru
  [octopi]
  ;; (print "--step--")
  ;; (print-map octopi)
  ;; First, increase all points by one
  (def updated (atom (update-keys inc octopi)))
  ;; Find the next octopus ready to flash, if any
  (def flasher (atom (find-flasher @updated)))
  ;; For each flashing octopus
  (while (some? @flasher)
    (swap! flashes inc)
    (swap! updated handle-flasher @flasher)
    (reset! flasher (find-flasher @updated)))
  (update-keys #(if (nil? %) 0 %) @updated))

(defn count-flashes
  [octopi n]
  ;; (println "\n===START===")
  (loop [step 0
         flashes 0
         current octopi]
    (if (>= step n) flashes
        (let [next (step-thru current)
              flashed (count (filter #(= (second %) 0) next))]
          (recur (inc step) (+ flashes flashed) next)))))

#_(println "\nFlashes:" (count-flashes example 196))
