(ns advent-of-code-2021.03.part1)

(def example '("00100"
               "11110"
               "10110"
               "10111"
               "10101"
               "01111"
               "00111"
               "11100"
               "10000"
               "11001"
               "00010"
               "01010"))

(def input (advent-of-code-2021.io/readInput "src/advent_of_code_2021/03/input.txt"))

(defn bit-flipper
  "Convert a binary string into it's complement
  '1101' -> '0010'"
  [bits]
  (reduce (fn [s c] (str s (if (= c \0) \1 \0))) "" bits))

(defn find-gamma
  "Given a diagnostic report of binary strings, find the most common bit
  in the corresponding position of all strings."
  [report]
  ; Using the frequencies, compare to find the most common and join into a single string
  (apply str
         (map (fn [[zero one]] (if (> zero one) "0" "1"))
         ; Aggregate the most common digit for each line
         (reduce
           (fn [fs s]
             ; Given a line, add the frequency for each position
             (map-indexed (fn [idx [zero one]]
               ; Return a new vector for this position
               ; calculating the number of
               [(+ zero (if (= \0 (nth s idx)) 1 0))
               (+ one (if (= \1 (nth s idx)) 1 0))])
               fs))
           ; Build a frequency map for the length of each string in the report
           ; starting at [0 0] because we haven't looked at any string yet
           (for [x (range (count (nth report 0)))] [0 0])
           report))))

(defn find-epsilon [report]
  (bit-flipper (find-gamma report)))

(find-gamma example)

(find-epsilon example)

(defn find-power-consumption [report]
  (* (Integer/parseInt (find-gamma report) 2)
     (Integer/parseInt (find-epsilon report) 2)))

(println (find-power-consumption input))
