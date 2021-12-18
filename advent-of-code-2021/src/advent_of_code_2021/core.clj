(ns advent-of-code-2021.core
  (:require [advent-of-code-2021.14.part1 :refer [example input polymer-quantity run]])
  (:gen-class))

(defn -main
  [& args]
  (println "Main: day 14 part 2" (polymer-quantity (run input 40))))
