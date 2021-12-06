(ns advent-of-code-2021.01.part2)

(def example '(199 200 208 210 200 207 240 269 260 263))

(def input (advent-of-code-2021.io/readInputN "src/advent_of_code_2021/01/input.txt"))

(defn buildWindows [measurements]
  ; The final two windows aren't complete, so remove them from the list
  (take (- (count measurements) 2)
        ; Use list comprehension to build a list of all the indexes
        (for [index (range (count measurements))]
          ; then pull out the current three-measurement window and find their sum
          (+ (nth measurements index)
             ; make sure we don't get an index out of bounds exception, add 0 instead
             (if (< (+ 1 index) (count measurements)) (nth measurements (+ 1 index)) 0)
             (if (< (+ 2 index) (count measurements)) (nth measurements (+ 2 index)) 0)))))

(advent-of-code-2021.01.part1/countIncreases (buildWindows input))
