const { readInputLines } = require("../utils");

const toNum = (line) => line.split("").map(Number);

const sample = [
  "30373",
  "25512",
  "65332",
  "33549",
  "35390"
].map(toNum);
const input = readInputLines().map(toNum);


const isVisible = (n, x, y, grid) => {
  if (x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1) return true;
  let yTop = y, yBottom = y, xLeft = x, xRight = x;
  // from top
  let visible = true;
  while (yTop > 0 && visible) {
    yTop--;
    if (n <= grid[yTop][x]) {
      visible = false;
      break;
    }
  }
  if (visible) return true;
  // from bottom
  visible = true;
  while (yBottom < grid.length - 1 && visible) {
    yBottom++;
    if (n <= grid[yBottom][x]) {
      visible = false;
      break;
    }
  }
  if (visible) return true;
  // from left
  visible = true;
  while (xLeft > 0 && visible) {
    xLeft--;
    if (n <= grid[y][xLeft]) {
      visible = false;
      break;
    }
  }
  if (visible) return true;
  // from right
  visible = true;
  while (xRight < grid[0].length - 1 && visible) {
    xRight++;
    if (n <= grid[y][xRight]) {
      visible = false;
      break;
    }
  }
  return visible;
};

const solve = (trees) => {
  const visible = trees.map((row, y) => row.map((tree, x) => isVisible(tree, x, y, trees)));
  return [].concat(...visible).filter(Boolean).length;
};

// console.log("visible:", solve(sample));
console.log("visible:", solve(input));

module.exports = { isVisible };
