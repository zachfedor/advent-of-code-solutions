(ns aoc-2023.core
  (:require [aoc-2023.01]
            [aoc-2023.02]
            [aoc-2023.03]
            ;; [aoc-2023.04]
            ;; [aoc-2023.05]
            ;; [aoc-2023.06]
            ;; [aoc-2023.07]
            ;; [aoc-2023.08]
            ;; [aoc-2023.09]
            ;; [aoc-2023.10]
            [clojure.java.io]))

(defn read-input
  [day]
  (slurp (clojure.java.io/resource day)))

(defn -main
  "Run task for specific day

  lein run 01.1"
  [part]
  (case part
    "01.1" (println (aoc-2023.01/part1 (read-input "01.txt")))
    "01.2" (println (aoc-2023.01/part2 (read-input "01.txt")))
    "02.1" (println (aoc-2023.02/part1 (read-input "02.txt")))
    "02.2" (println (aoc-2023.02/part2 (read-input "02.txt")))
    ;; "03.1" (println (aoc-2023.03/part1 (read-input "03.txt")))
    ;; "03.2" (println (aoc-2023.03/part2 (read-input "03.txt")))
    ;; "04.1" (println (aoc-2023.04/part1 (read-input "04.txt")))
    ;; "04.2" (println (aoc-2023.04/part2 (read-input "04.txt")))
    ;; "05.1" (println (aoc-2023.05/part1 (read-input "05.txt")))
    ;; "05.2" (println (aoc-2023.05/part2 (read-input "05.txt")))
    ;; "06.1" (println (aoc-2023.06/part1 (read-input "06.txt")))
    ;; "06.2" (println (aoc-2023.06/part2 (read-input "06.txt")))
    ;; "07.1" (println (aoc-2023.07/part1 (read-input "07.txt")))
    ;; "07.2" (println (aoc-2023.07/part2 (read-input "07.txt")))
    ;; "08.1" (println (aoc-2023.08/part1 (read-input "08.txt")))
    ;; "08.2" (println (aoc-2023.08/part2 (read-input "08.txt")))
    ;; "09.1" (println (aoc-2023.09/part1 (read-input "09.txt")))
    ;; "09.2" (println (aoc-2023.09/part2 (read-input "09.txt")))
    ;; "10.1" (println (aoc-2023.10/part1 (read-input "10.txt")))
    ;; "10.2" (println (aoc-2023.10/part2 (read-input "10.txt")))
    ;; "11.1" (println (aoc-2023.11/part1 (read-input "11.txt")))
    ;; "11.2" (println (aoc-2023.11/part2 (read-input "11.txt")))
    ;; "12.1" (println (aoc-2023.12/part1 (read-input "12.txt")))
    ;; "12.2" (println (aoc-2023.12/part2 (read-input "12.txt")))
    ;; "13.1" (println (aoc-2023.13/part1 (read-input "13.txt")))
    ;; "13.2" (println (aoc-2023.13/part2 (read-input "13.txt")))
    ;; "14.1" (println (aoc-2023.14/part1 (read-input "14.txt")))
    ;; "14.2" (println (aoc-2023.14/part2 (read-input "14.txt")))
    ;; "15.1" (println (aoc-2023.15/part1 (read-input "15.txt")))
    ;; "15.2" (println (aoc-2023.15/part2 (read-input "15.txt")))
    ;; "16.1" (println (aoc-2023.16/part1 (read-input "16.txt")))
    ;; "16.2" (println (aoc-2023.16/part2 (read-input "16.txt")))
    ;; "17.1" (println (aoc-2023.17/part1 (read-input "17.txt")))
    ;; "17.2" (println (aoc-2023.17/part2 (read-input "17.txt")))
    ;; "18.1" (println (aoc-2023.18/part1 (read-input "18.txt")))
    ;; "18.2" (println (aoc-2023.18/part2 (read-input "18.txt")))
    ;; "19.1" (println (aoc-2023.19/part1 (read-input "19.txt")))
    ;; "19.2" (println (aoc-2023.19/part2 (read-input "19.txt")))
    ;; "20.1" (println (aoc-2023.20/part1 (read-input "20.txt")))
    ;; "20.2" (println (aoc-2023.20/part2 (read-input "20.txt")))
    ;; "21.1" (println (aoc-2023.21/part1 (read-input "21.txt")))
    ;; "21.2" (println (aoc-2023.21/part2 (read-input "21.txt")))
    ;; "22.1" (println (aoc-2023.22/part1 (read-input "22.txt")))
    ;; "22.2" (println (aoc-2023.22/part2 (read-input "22.txt")))
    ;; "23.1" (println (aoc-2023.23/part1 (read-input "23.txt")))
    ;; "23.2" (println (aoc-2023.23/part2 (read-input "23.txt")))
    ;; "24.1" (println (aoc-2023.24/part1 (read-input "24.txt")))
    ;; "24.2" (println (aoc-2023.24/part2 (read-input "24.txt")))
    ;; "25.1" (println (aoc-2023.25/part1 (read-input "25.txt")))
    ;; "25.2" (println (aoc-2023.25/part2 (read-input "25.txt")))
    (println (str part ": Not Implemented"))))
