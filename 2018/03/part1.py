# Day 03 - part 01
# 2018-12-03

def convert_lines (lines):
    inputs = {}

    for l in lines:
        l = l.replace('#', '')
        l = l.replace('@ ', '')
        l = l.replace(':', '')
        arr = l.split(' ')
        coords = arr[1].split(',')
        size = arr[2].split('x')

        inputs[arr[0]] = {
            'x': int(coords[0]),
            'y': int(coords[1]),
            'w': int(size[0]),
            'h': int(size[1]),
        }

    return inputs



test = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
]
inputs = convert_lines(test)
print(inputs)

# f = open("input.txt", "r")
# inputs = convert_lines(f.readlines())
# f.close()
