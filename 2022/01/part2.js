const { readInputLines } = require("../utils");

const sample = [
  1000,
  2000,
  3000,
  null,
  4000,
  null,
  5000,
  6000,
  null,
  7000,
  8000,
  9000,
  null,
  10000
];
const input = readInputLines().map(l => l ? Number(l) : null);

const solve = () => {
  let most = [0, 0, 0];
  let current = 0;

  for (let n of [...input, null]) {
    if (n === null) {
      const index = most.findIndex(m => m < current);
      if (index > -1) {
        most[index] = current;
        most.sort((a, b) => a - b);
      }
      current = 0;
    } else {
      current += n;
    }
  }

  return most.reduce((sum, num) => sum + num);
}

console.log(solve());
