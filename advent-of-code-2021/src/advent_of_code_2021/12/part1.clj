(ns advent-of-code-2021.12.part1
  (:require [clojure.string :as str]))

(defn parse-input
  [in] (map #(str/split % #"-") (str/split in #"\n")))

(def example (parse-input "start-A
start-b
A-c
A-b
b-d
A-end
b-end"))

(def input (parse-input "ln-nr
ln-wy
fl-XI
qc-start
qq-wy
qc-ln
ZD-nr
qc-YN
XI-wy
ln-qq
ln-XI
YN-start
qq-XI
nr-XI
start-qq
qq-qc
end-XI
qq-YN
ln-YN
end-wy
qc-nr
end-nr"))

(defn build-map
  "Given a collection of paths `[start end]`, create a map where each key is a
  location and its value is a vector of locations it is connected to."
  [coll]
  (reduce (fn [m [start end]]
            (assoc m                                 ; Add current path to map
                   start (conj (get m start []) end) ;   going left-to-right
                   end (conj (get m end []) start))) ;   going right-to-left
          {} coll))

#_(println (build-map example))

(defn lower-case?
  "Determine if a string is all lower-case characters"
  [s] (= s (str/lower-case s)))

#_(lower-case? "aaba")

(defn find-routes
  ([m] (find-routes m "start" ""))
  ([m here path]
   ;; Base case: we've reached the end so return the path we took to get here
   (if (= here "end") (list (str path "end"))
       ;; Otherwise: grab all the points we could travel to from here
       (->> (m here)
            ;; Remove **small** points we've already been at in this path
            (remove (fn [dest] (and (lower-case? dest) (str/includes? path dest))))
            ;; And find their routes to the end, adding current point to the path
            (mapcat #(find-routes m % (str path here "-")))))))

#_(find-routes (build-map example))

(defn run [in]
  (->> in build-map find-routes count))

(println "Day 12 - Part 1: " (run input))
