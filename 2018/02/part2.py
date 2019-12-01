# Day 02 - part 02
# 2018-12-02

def check_consecutive (inputs):
    for index, item in enumerate(inputs):
        rest = inputs[0:]
        for compare in inputs[(index + 1):]:
            matches = [x for i, x in enumerate(item) if x == compare[i]]
            if len(matches) == len(item) - 1:
                return ''.join(matches)

# Test Strings
# inputs = [
#     'abcde',
#     'fghij',
#     'klmno',
#     'pqrst',
#     'fguij',
#     'axcye',
#     'wvxyz',
# ]


f = open('input.txt', 'r')
inputs = [s.strip() for s in f.readlines()]

print(check_consecutive(inputs))
    
