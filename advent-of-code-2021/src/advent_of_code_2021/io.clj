(ns advent-of-code-2021.io)

(defn readInput
  "Given a file, return it's contents as a vector of lines as strings"
  [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (reduce conj [] (line-seq rdr))))

(defn readInputN
  "Given a file, return it's contents as a vector of lines as integers"
  [file]
  (map #(Integer/parseInt %) (readInput file)))
