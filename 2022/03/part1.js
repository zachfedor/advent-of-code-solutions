const { readInputLines } = require("../utils");

const sample = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];
const input = readInputLines().map(s => s.trim()).filter(Boolean);

const findRepeat = (str, index) => {
  const first = str.slice(0, str.length / 2);
  const second = str.slice(str.length / 2);

  for (let c of first) {
    if (second.includes(c)) return c;
  }

  console.log(index, str);
  return null;
};

const findPriority = (char) => {
  let code = char.charCodeAt(0);
  return code < 97 ? code - 38 : code - 96;
};

const solve = () => input.map(findRepeat).reduce((sum, char) => sum + findPriority(char), 0);

console.log(solve());
