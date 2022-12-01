const { readInputLines } = require("../utils");

const input = readInputLines().map(l => l ? Number(l) : null);

const solve = () => {
  let most = 0;
  let current = 0;

  for (let n of input) {
    if (n === null) {
      most = current > most ? current : most;
      current = 0;
    } else {
      current += n;
    }
  }

  return most;
}

console.log(solve());
