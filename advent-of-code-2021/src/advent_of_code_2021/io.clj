(ns advent-of-code-2021.io
  (:require [clojure.string :as str]))

(defn readInput
  "Given a file, return it's contents as a vector of lines as strings"
  [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (reduce conj [] (line-seq rdr))))

(defn readInputN
  "Given a file, return it's contents as a vector of lines as integers"
  [file]
  (vec (map #(Integer/parseInt %) (readInput file))))

(defn readStrings
  "Given a file, return its single-line contents as a vector of strings, split by a separator"
  ([file] (readStrings file #","))
  ([file separator] (-> file
                        (readInput)
                        (first)
                        (str/split separator))))

(defn readInts
  "Given a file, return its single-line contents as a vector of integers, split by a separator"
  ([file] (readInts file #","))
  ([file separator] (vec (map #(Integer/parseInt %) (readStrings file separator)))))
