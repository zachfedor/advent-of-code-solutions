(ns advent-of-code-2021.09.part2
  (:require [advent-of-code-2021.09.part1 :as part1 :refer [example input]]
            [clojure.set :as set]))

;; (defn get-basin
;;   [hm [x y]]
;;   (let [max-y (-> hm count dec)        ; Find index of last row
;;         max-x (-> hm first count dec)  ; Find index of last column
;;         height (get-in hm [y x])]      ; Get height of current point
;;     (loop [basin #{}                                          ; The basin of points
;;            next-hs (->> (part1/get-neighbors x y max-x max-y) ; Get list of orthogonal points
;;                         (remove (fn [[x' y']]                  ; Remove 9s and lower points
;;                                   (let [h (get-in hm [y' x'])]
;;                                     (or (= h 9) (< h height))))))]
;;       ;; Base case: There are no neighbors one-level up or we're at the max height
;;       (if (or (empty? next-hs) (= height 8))
;;         ;; So add this point to the current set and return it
;;         (conj basin [x y])
;;         ;; Otherwise, conjoin this point and the basins of each next neighbor
;;         (apply set/union basin #{[x y]} (map #(get-basin hm %) next-hs))))))
;;
;; #_(get-basin example (nth (part1/find-low-points example) 3))
;;
;; #_(count (get-basin input (nth (part1/find-low-points input) 62)))

(defn queue
  "Creates a new queue containing the contents of coll."
  ([] (clojure.lang.PersistentQueue/EMPTY))
  ([coll]
   (reduce conj clojure.lang.PersistentQueue/EMPTY coll)))

#_(peek (queue [1 2 3]))

#_(seq (pop (queue [1 2 3])))

#_(empty? (queue []))

(defn walk-to-low
  "Given a point, return a path to its low point"
  [coord hm]
  (let [max-y (-> hm count dec)        ; Find bounds of the matrix for y
        max-x (-> hm first count dec)] ;   and x axes.
    (loop [q (queue [coord])            ; Create a queue to process coords.
           path []]                    ; Keep track of the total path walked.
      (if (empty? q) path              ; BASE CASE: At end of path, return it.
          (let [[x y] (peek q)         ; ELSE: Get current coordinates
                h (get-in hm [y x])    ;   and its height.
                q (pop q)              ; Save rest of queue for next iteration
                ;; Now get all neighboring points and keep the ones lower than current point
                neighbors (->> (part1/get-neighbors x y max-x max-y)
                               (filter (fn [[x' y']] (< (get-in hm [y' x']) h))))
                ;; Add potential paths to the processing queue
                q (apply conj q neighbors)]
            ;; Run next iteration adding this point to the path
            (recur q (conj path [x y])))))))

#_(walk-to-low [0 1] example)

(defn get-basins [hm]
  (let [rows (-> hm count)                ; Find bounds of the matrix for y
        cols (-> hm first count)          ;   and x axes.
        paths (for [y (range rows)        ; Compose a list of all coordinates
                    x (range cols)        ;   where the height is not 9.
                    :when (not= 9 (get-in hm [y x]))]
                (walk-to-low [x y] hm))]  ; Then find its path to a lowpoint
    (->> paths
         (reduce (fn [s path]                    ; Turn list of paths into a map keyed by lowpoint
                   (let [lowpoint (last path)]  ; Lowpoint is final step in path
                     (assoc s lowpoint          ; Add lowpoint to map, where the value is a set of the
                            (set (concat path (get s lowpoint)))))) ; current path and the points already
                 {})                                                ; added at that key from other paths.
         vals           ; Grab the sets and count the elements
         (map count)
         sort
         (take-last 3)  ; Multiplying the biggest three together
         (reduce *))))

#_(println "\nDay 09 - Part 2: " (get-basins input))
