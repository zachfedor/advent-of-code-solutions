const fs = require("fs");
const path = require("path");

const map = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")
                .trim()
                .split("\n")
                .map(l => l.split("").map(Number));

const yMax = map.length - 1;
const xMax = map[0].length - 1;

const getNeighbors = (x, y) => {
  const results = [];
  if (y > 0) results.push({ h: map[y - 1][x], x, y: y - 1 });
  if (x > 0) results.push({ h: map[y][x - 1], x: x - 1, y });
  if (x < xMax) results.push({ h: map[y][x + 1], x: x + 1, y });
  if (y < yMax) results.push({ h: map[y + 1][x], x, y: y + 1 });
  return results;
};

console.log(getNeighbors(9, 1));

const findLows = () => {
  const lows = [];
  map.forEach((row, y) => {
    row.forEach((h, x) => {
      const lowerNeighbors = getNeighbors(x, y).filter(n => n.h <= h);
      if (lowerNeighbors.length === 0) lows.push({ h, x, y });
    });
  });
  return lows;
};

console.log(findLows());

const getBasin = ({ x, y, h }, basin={}) => {
  basin[`${x},${y}`] = h;
  const nextHs = getNeighbors(x, y).filter(n => {
    if (n.h !== h + 1 || n.h === 9) return false;
    if (basin.hasOwnProperty(`${n.x},${n.y}`)) return false;
    return true;
  });
  // base case
  if (nextHs.length === 0) return basin;
  return nextHs.reduce((acc, nextH) => ({
    ...acc,
    ...getBasin(nextH, basin)
  }), {});
};

const basins = findLows().map(l => getBasin(l));

console.log(basins.map(b => Object.keys(b).length)
                  .sort((a, b) => a - b)
                  .reverse()
                  .slice(0, 3)
                  .reduce((acc, cur) => acc * cur, 1));
