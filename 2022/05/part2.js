const { readInputLines } = require("../utils");

const input = readInputLines();
const sample = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2"
];

const createBoxArray = (boxStrings) => {
  const boxes = boxStrings.slice(0, boxStrings.length - 1);

  return boxStrings[boxStrings.length - 1].split("").map((n, i) => {
    if (n === " ") return null;

    return boxes.map((line) => line[i]).reverse().filter((char) => char !== " ");
  }).filter(Boolean);
};

const solve = (input) => {
  const split = input.findIndex(s => s === "");
  const boxes = createBoxArray(input.slice(0, split));
  const insts = input.slice(split + 1);

  for (let inst of insts) {
    let [num, from, to] = inst.split(" ").map(Number).filter(n => !Number.isNaN(n));
    from--;
    to--;

    boxes[to].push(...boxes[from].splice(boxes[from].length - num));
  }

  return boxes.reduce((agg, cur) => agg + cur[cur.length - 1], "");
};

console.log(solve(input));
