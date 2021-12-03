(ns advent-of-code-2021.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!"))

(defn readInput [file]
  (with-open [rdr (clojure.java.io/reader file)]
    (reduce conj [] (line-seq rdr))))

(defn readInputN [file]
  (map #(Integer/parseInt %) (readInput file)))
