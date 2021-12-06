(ns advent-of-code-2021.core
  (:require [advent-of-code-2021.06.part1 :refer [run input example]])
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println (str "New fish: " (run example 200))))
