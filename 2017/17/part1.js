const steps = 369;

let state = [0];
let index = 1;
for (let i = 1; i <= 2017; ++i) {
  index = state.length > 1 ? (index + 1 + steps) % state.length : 1;
  state.splice(index, 0, i);
}

console.log(state[index + 1]);

