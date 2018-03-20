# steps = 3
steps = 369

state = []
index = 1
for i in xrange(50000000):
  index = (index + 1 + steps) % len(state) if len(state) > 1 else 1
  # print('insert {} after position {}: {}'.format(i, index, state))
  state.insert(index, i)
  # print(index, state)

print(state[state.index(0) + 1])

