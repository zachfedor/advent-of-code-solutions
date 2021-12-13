(ns advent-of-code-2021.12.part2
  (:require [advent-of-code-2021.12.part1 :as part1 :refer [example input]]
            [clojure.string :as str]
            [clojure.set :as set]))

(def example2 (part1/parse-input "dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc"))

#_(part1/build-map example2)

(defn can-visit?
  "Given a `path`, determine if `dest` can be the next location"
  [path dest]
  (let [prev (str/split path #"-")]
    (cond (not (part1/lower-case? dest)) true   ;; Big cave
          (not (some #(= % dest) prev)) true    ;; Can always visit small cave once
          (= dest "start") false                ;; Can't visit start more than once
          (contains? (->> prev                  ;; Visited this small cave before, but...
                          (filter part1/lower-case?)  ;;  find all lower caves previously visited
                          frequencies                 ;;  and see how many times we've been in each
                          set/map-invert) 2) false ;; Can't visit more than one small cave twice
          :else true)))

#_(can-visit? "start-a-b" "A")
#_(can-visit? "start-HN-dc-HN-kj-sa-kj" "dc")

(defn find-routes
  ([m] (find-routes m "start" ""))
  ([m here path]
   ;; Base case: we've reached the end so return the path we took to get here
   (if (= here "end") (list (str path "end"))
       ;; Otherwise: grab all the points we could travel to from here
       (->> (m here)
            ;; Remove **small** points we've already been at in this path
            ;; NOTE: we need to add here to the included path or it won't be counted
            (filter #(can-visit? (str path "-" here) %))
            ;; And find their routes to the end, adding current point to the path
            (mapcat #(find-routes m % (str path here "-")))))))

#_(count (find-routes (part1/build-map example)))

(defn run [in]
  (->> in part1/build-map find-routes count))

#_(println "Day 12 - Part 2: " (run input))
