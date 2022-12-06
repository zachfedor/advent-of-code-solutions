const { readInput } = require("../utils");

const sample = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
const input = readInput();

const solve = (input) => {
  let index = 3;

  while (index < input.length) {
    const set = new Set([input[index - 3], input[index - 2], input[index - 1], input[index]]);
    if ([...set].length === 4) break;
    index++;
  }

  return index + 1;
};

console.log(solve(input));
