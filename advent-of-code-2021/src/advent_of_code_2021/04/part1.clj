(ns advent-of-code-2021.04.part1
  (:require [advent-of-code-2021.io :refer [read-lines]]
            [clojure.string :as str]))

(def example ["7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1"
               ""
               "22 13 17 11  0"
               " 8  2 23  4 24"
               "21  9 14 16  7"
               " 6 10  3 18  5"
               " 1 12 20 15 19"
               ""
               " 3 15  0  2 22"
               " 9 18 13 17  5"
               "19  8  7 25 23"
               "20 11 10 24  4"
               "14 21 16 12  6"
               ""
               "14 21 17 24  4"
               "10 16 15  9 19"
               "18  8 23 26 20"
               "22 11 13  6  5"
               " 2  0 12  3  7"])

(def input (read-lines "src/advent_of_code_2021/04/input.txt"))

(defn any-empty?
  "Given a list of rows, determine if any are all `nil`"
  [rows] (some (fn [row] (every? nil? row)) rows))

(defn get-cols
  "Given a board, return a nested list of it's columns"
  [board] (for [col (range 5)] (map (fn [row] (nth row col)) board)))

(defn board-wins?
  "Given a board, a list of 5 lists, determine if it has won"
  [board] (or (any-empty? board) (any-empty? (get-cols board))))

(defn keep-going?
  "Given a list of boards, return true if none have won yet"
  [boards] (empty? (filter board-wins? boards)))

(defn mark-boards
  "Given a list of boards and a drawn number, return the resulting boards"
  [boards number]
  (map (fn [board]
         (->> board
              (flatten)
              (map (fn [space] (if (= space number) nil space)))
              (partition 5)))
       boards))

(defn get-numbers [in] (str/split (first in) #","))

(defn get-boards [in]
  (partition 5                                          ; Split the list of lines into boards of 5 lines each
             (for [line (rest in) :when (not= "" line)] ; Create list of input from non empty lines beyond the first
               (as-> line in                            ; Start macro to transform each line
                 (str/split in #" ")                    ; Split the string into a list at each space
                 (remove empty? in)))))                 ; Filter out blank elements

(defn run [in]
  (def numbers (get-numbers in))
  (def last-iteration (atom (get-boards in)))
  (def idx (atom 0))

  (while (keep-going? @last-iteration)
    (def drawn-num (nth numbers @idx))
    (swap! last-iteration mark-boards drawn-num)
    (swap! idx inc))

  (def last-num (Integer/parseInt (nth numbers (dec @idx))))

  (def winning-board (filter board-wins? @last-iteration))

  (defn board-sum
    [board] (->> board
                 (flatten)
                 (remove nil?)
                 (map #(Integer/parseInt %))
                 (reduce +)))

  (* (board-sum winning-board) last-num))

#_(println "Day 04 - Part 1: " (run input))
