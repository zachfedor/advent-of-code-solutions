const { readInputLines } = require("../utils");

const sample = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8"
];
const input = readInputLines();

const isOverlap = (str) => {
  const [[aStart, aEnd], [bStart, bEnd]] = str.split(",").map((s) => s.split("-").map(Number));
  return aStart >= bStart && aStart <= bEnd || aEnd >= bStart && aEnd <= bEnd ||
         bStart >= aStart && bStart <= aEnd || bEnd >= aStart && bEnd <= aEnd;
};

const solve = () => input.filter(isOverlap).length;

console.log(solve());
