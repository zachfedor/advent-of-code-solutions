const { readInput } = require("../utils");

const sample = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
const input = readInput();

const solve = (input) => {
  let index = 13;

  while (index < input.length) {
    const set = new Set(input.slice(index - 14, index));
    if ([...set].length === 14) break;
    index++;
  }

  return index;
};

console.log(solve(input));
