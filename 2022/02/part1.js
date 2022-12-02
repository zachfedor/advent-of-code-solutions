const { readInputLines } = require("../utils");

const sample = ["A Y", "B X", "C Z"];
const input = readInputLines();

const compare = (str) => {
  let score = 0;

  if (str[2] === "X") {
    score += 1; // you choose rock
    if (str[0] === "A") score += 3; // against rock, draw
    else if (str[0] === "B") score += 0; // against paper, lose
    else if (str[0] === "C") score += 6; // against scissors, win
  } else if (str[2] === "Y") {
    score += 2; // you choose paper
    if (str[0] === "A") score += 6; // against rock, win
    else if (str[0] === "B") score += 3; // against paper, draw
    else if (str[0] === "C") score += 0; // against scissors, lose
  } else if (str[2] === "Z") {
    score += 3; // you choose scissors
    if (str[0] === "A") score += 0; // against rock, lose
    else if (str[0] === "B") score += 6; // against paper, win
    else if (str[0] === "C") score += 3; // against scissors, draw
  }

  return score;
}

const solve = () => input.reduce((sum, cur) => sum + compare(cur), 0);

console.log(solve());
