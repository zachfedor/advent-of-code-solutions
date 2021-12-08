(ns advent-of-code-2021.04.part2
  (:require [advent-of-code-2021.04.part1 :as part1 :refer [example input]]))

(defn run [in]
  (def numbers (part1/get-numbers in))
  (def last-iteration (atom (part1/get-boards in)))
  (def idx (atom 0))

  ;; Find the last board
  (while (< 1 (count @last-iteration))
    (def drawn-num (nth numbers @idx))
    #_(println (str "drawing: " drawn-num))
    ;; Remove boards that have won from the list
    (reset! last-iteration (remove part1/board-wins? (part1/mark-boards @last-iteration drawn-num)))
    (swap! idx inc))

  #_(println "== Found Winner ==")

  ;; Keep playing the final board till it wins
  (while (part1/keep-going? @last-iteration)
    (def drawn-num (nth numbers @idx))
    #_(println (str "drawing: " drawn-num))
    (swap! last-iteration part1/mark-boards drawn-num)
    (swap! idx inc))

  (def last-num (Integer/parseInt (nth numbers (dec @idx))))
  (def winning-board (first @last-iteration))

  (* (part1/board-sum winning-board) last-num))

(println "Day 04 - Part 2: " (run input))
