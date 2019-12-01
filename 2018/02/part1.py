# Day 02 - part 01
# 2018-12-02

def checksum (inputs):
    a = 0
    b = 0
    for i in inputs:
        count = has_two_or_three(i)
        a += count[0]
        b += count[1]

    return a * b

def has_two_or_three (word):
    count = {}

    for char in word:
        if char not in count:
            count[char] = 1
        else:
            count[char] += 1

    a = 0
    b = 0
    for key in list(count):
        if count[key] == 2:
            a = 1
        elif count[key] == 3:
            b = 1

    return [a, b]

# Test Strings
# inputs = [
#     'abcdef',
#     'bababc',
#     'abbcde',
#     'abcccd',
#     'aabcdd',
#     'abcdee',
#     'ababab'
# ]

f = open('input.txt', 'r')
inputs = f.readlines()

print(checksum(inputs))


    
