# DAY 01 - Part 1
# 2018-12-02

def sum (list):
    result = 0
    for i in list:
        int_i = int(i.replace("+", ""))
        result += int_i

    print(result)

# t1 = ["+1", "+1", "+1"]
# t2 = ["+1", "+1", "-2"]
# t3 = ["-1", "-2", "-3"]

# sum(t1)
# sum(t2)
# sum(t3)

f = open("input.txt", "r")
inputs = f.readlines()

sum(inputs)
