(ns aoc-2023.01-test
  (:require [aoc-2023.01 :refer [part1 part2]]
            [clojure.test :refer [deftest is]]
            [clojure.java.io :refer [resource]]))

(deftest test1
  (let [expected 142]
    (is (= expected (part1 (slurp (resource "01-example.txt")))))))

(deftest test2
  (let [expected 281]
    (is (= expected (part2 (slurp (resource "01-example-2.txt")))))))
