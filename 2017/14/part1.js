const { getDenseHash } = require('../10/part2');
const input = 'ljoxqyyw';
const testInput = 'flqrgnkx';

function hexToBinary(hex) {
  const x = parseInt(hex, 16).toString(2);
  return x.length < 4 ? ([...Array(5 - x.length)].join('0') + x) : x;
}

function getHashes(keyString) {
  return [...Array(128).keys()].map(row => {
    return getDenseHash(`${keyString}-${row}`)
      .split('')
      .map(hex => hexToBinary(hex))
      .join('');
  });
}

const total = getHashes(input).reduce((hashTotal, row) => {
  const usedInRow = row.split('').reduce((rowTotal, bit) => rowTotal + parseInt(bit, 10), 0);
  return hashTotal + usedInRow;
}, 0);
console.log(total);
