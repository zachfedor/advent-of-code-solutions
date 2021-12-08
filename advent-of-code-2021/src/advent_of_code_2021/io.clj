(ns advent-of-code-2021.io
  (:require [clojure.string :as str]))

(defn read-lines
  "Given a file, return it's contents as a vector of lines as strings"
  [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (reduce conj [] (line-seq rdr))))

(defn read-linesn
  "Given a file, return it's contents as a vector of lines as integers"
  [file]
  (mapv #(Integer/parseInt %) (read-lines file)))

(defn read-strings
  "Given a file, return its single-line contents as a vector of strings, split by a separator"
  ([file] (read-strings file #","))
  ([file separator] (-> file
                        (read-lines)
                        (first)
                        (str/split separator))))

(defn read-ints
  "Given a file, return its single-line contents as a vector of integers, split by a separator"
  ([file] (read-ints file #","))
  ([file separator] (mapv #(Integer/parseInt %) (read-strings file separator))))
