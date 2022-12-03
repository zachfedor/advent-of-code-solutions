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

const groupInThrees = (arr) => arr.reduce((acc, cur) => {
  const lastIndex = acc.length - 1;
  if (acc[lastIndex].length === 3) {
    return [...acc, [cur]];
  } else {
    return [...acc.slice(0, lastIndex), [...acc[lastIndex], cur]];
  }
}, [[]]);

const findRepeat = (arr) => {
  let common = [];
  for (let c of arr[0]) {
    if (arr[1].includes(c)) common.push(c);
  }

  return common.filter((c) => arr[2].includes(c))[0];
};

const findPriority = (char) => {
  let code = char.charCodeAt(0);
  return code < 97 ? code - 38 : code - 96;
};

const solve = () => groupInThrees(input).map(findRepeat).reduce((sum, char) => sum + findPriority(char), 0);

console.log(solve());
