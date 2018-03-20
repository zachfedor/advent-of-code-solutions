// const steps = 3;
const steps = 369;

let state = [0];
let index = 1;
for (let i = 1; i <= 50000000; ++i) {
  index = state.length > 1 ? (index + 1 + steps) % state.length : 1;
  // console.log(`insert ${i} after position ${index}: ${state}`);
  state.splice(index, 0, i);
  // console.log(index, state);
}

console.log(state[state.indexOf(0) + 1]);

