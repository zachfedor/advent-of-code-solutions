def spin(programs, i):
    return programs[::-1][:i][::-1] + programs[::-1][i:][::-1]

def exchange(programs, a, b):
    tmp = programs[a]
    programs[a] = programs[b]
    programs[b] = tmp
    return programs

def partner(programs, a, b):
    x = programs.index(a)
    y = programs.index(b)
    return exchange(programs, x, y)

def dance(programs, input):
    steps = input.split(',')

    for step in steps:
        if step[0] == 's':
            programs = spin(programs, int(step[1:]))
        elif step[0] == 'x':
            xs = step[1:].split('/')
            programs = exchange(programs, int(xs[0]), int(xs[1]))
        elif step[0] == 'p':
            ps = step[1:].split('/')
            programs = partner(programs, ps[0], ps[1])

    return programs


def longDance(input, length):
    # iteration = ['a','b','c','d','e']
    iteration = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']

    for i in xrange(length):
        iteration = dance(iteration, input) 

    return ''.join(iteration)


file = open('input.txt', 'r')
input = file.read()
# print(longDance('s1,x3/4,pe/b', 2))
print(longDance(input, 1))

