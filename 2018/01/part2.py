# DAY 01 - Part 2
# 2018-12-02

# 

def getNext (last_index, length):
    next_index = last_index + 1
    if next_index < length:
        return next_index
    else:
        return 0


def sum (l):
    index = -1
    last_result = 0
    results = set()

    while last_result not in results:
        results.add(last_result)
        index = getNext(index, len(l))
        i = l[index]
        int_i = int(i.replace("+", ""))
        last_result += int_i

    print(last_result)

# Test Problems
# t1 = ["+1", "-1"]
# t2 = ["+3", "+3", "+4", "-2", "-4"]
# t3 = ["-6", "+3", "+8", "+5", "-6"]
# t4 = ["+7", "+7", "-2", "-7", "-4"]

# sum(t1)
# sum(t2)
# sum(t3)
# sum(t4)

f = open("input.txt", "r")
inputs = f.readlines()

sum(inputs)
