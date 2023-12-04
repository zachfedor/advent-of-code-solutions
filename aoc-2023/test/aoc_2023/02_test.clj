(ns aoc-2023.02-test
  (:require [aoc-2023.02 :refer [part1 part2]]
            [clojure.test :refer [deftest is]]
            [clojure.java.io :refer [resource]]))

(deftest test1
  (let [expected 8]
    (is (= expected (part1 (slurp (resource "02-example.txt")))))))

(deftest test2
  (let [expected 2286]
    (is (= expected (part2 (slurp (resource "02-example.txt")))))))
