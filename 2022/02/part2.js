const { readInputLines } = require("../utils");

const sample = ["A Y", "B X", "C Z"];
const input = readInputLines();

const compare = (str) => {
  let score = 0;

  if (str[2] === "X") {
    score += 0; // you need to lose
    if (str[0] === "A") score += 3; // against rock, pick scissors
    else if (str[0] === "B") score += 1; // against paper, pick rock
    else if (str[0] === "C") score += 2; // against scissors, pick paper
  } else if (str[2] === "Y") {
    score += 3; // you need to draw
    if (str[0] === "A") score += 1; // against rock, pick rock
    else if (str[0] === "B") score += 2; // against paper, pick paper
    else if (str[0] === "C") score += 3; // against scissors, pick scissors
  } else if (str[2] === "Z") {
    score += 6; // you need to win
    if (str[0] === "A") score += 2; // against rock, pick paper
    else if (str[0] === "B") score += 3; // against paper, pick scissors
    else if (str[0] === "C") score += 1; // against scissors, pick rock
  }

  return score;
}

const solve = () => input.reduce((sum, cur) => sum + compare(cur), 0);

console.log(solve());
