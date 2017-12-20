matches = 0
judged = 0

def genA():
    a = 116
    # a = 65 # test
    while True:
        a = (16807 * a) % 2147483647
        if a % 4 == 0:
            yield a


def genB():
    b = 299
    # b = 8921 # test
    while True:
        b = (48271 * b) % 2147483647
        if b % 8 == 0:
            yield b


A = genA()
B = genB()
for i in range(5000000):
    if A.next() & 0xffff == B.next() & 0xffff:
        matches += 1


print(matches)
