const { getDenseHash } = require('../10/part2');
const input = 'ljoxqyyw';
const testInput = 'flqrgnkx';

function hexToBinary(hex) {
  const x = parseInt(hex, 16).toString(2);
  return x.length < 4 ? ([...Array(5 - x.length)].join('0') + x) : x;
}

function getHashes(keyString) {
  return [...Array(8).keys()].map(row => {
    return getDenseHash(`${keyString}-${row}`)
      .split('')
      .map(hex => hexToBinary(hex))
      .join('');
  });
}

function getAdjacent(grid, x, y) {
  const n = !!grid[x + 1] ? grid[x + 1][y] : null;
  const s = !!grid[x - 1] ? grid[x - 1][y] : null;
  const e = !!grid[x][y + 1] ? grid[x][y + 1] : null;
  const w = !!grid[x][y - 1] ? grid[x][y - 1] : null;
  return [n,s,e,w].reduce((a, b) => Number.isInteger(b) ? b : a, false);
}

const grid = getHashes(testInput).map(row => row.split('').map(b => b === '1').slice(0, 8));
console.log(grid);
let group = 0;
for (let x = 0; x < 8; ++x) {
  for (let y = 0; y < 8; ++y) {
    if (grid[x][y]) {
      const adjacent = getAdjacent(grid, x, y);
      grid[x][y] = adjacent ? adjacent : ++group;
    }
  }
}
console.log(grid);
