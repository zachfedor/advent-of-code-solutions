(ns aoc-2023.01
  (:require [clojure.string :as str]))

(defn get-double-digit
  "Get the first and last digit from a string"
  [line]
  (let [nums (str/replace line #"\D" "")]
    (Integer/parseInt (str (first nums) (last nums)))))

(defn part1
  "Day 01 Part 1"
  [input]
  (reduce + (map get-double-digit (str/split input #"\n"))))

(def num-hash
  "A map of number's word to its digit"
  {"one" "1",
   "two" "2",
   "three" "3",
   "four" "4",
   "five" "5",
   "six" "6",
   "seven" "7",
   "eight" "8"
   "nine" "9"})

(defn split-overlaps
  "Catch their tricky string overlaps..."
  [line]
  (-> line
      (str/replace #"oneight" "18")
      (str/replace #"twone" "2121")
      (str/replace #"threeight" "38")
      (str/replace #"fiveight" "58")
      (str/replace #"eightwo" "82")
      (str/replace #"eighthree" "83")
      (str/replace #"nineight" "98")))

(defn get-nums-from-line
  "Convert a string with spelled out numbers to a list of all digits"
  [line]
  (->> line
       (split-overlaps)
       ;; Get a sequence of all the digits and words of digits in the line
       (re-seq #"(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)")
       ;; Get the first item from all regex match groups
       (map (fn [group] (group 0)))
       ;; Use the hashmap of words to their digit, if necessary
       (map (fn [x] (if (num-hash x) (num-hash x) x)))))

(defn get-double-digit-2
  "Convert a list of digits to a number using the first and last digit"
  [nums]
  (println nums)
  (Integer/parseInt (str (first nums) (last nums))))

(defn part2
  "Day 02 Part 2"
  [input]
  (reduce + (->> (str/split input #"\n")
                 (map get-nums-from-line)
                 (map get-double-digit-2))))
