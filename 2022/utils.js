const fs = require('fs');

const readInput = () => {
  const str = fs.readFileSync('./input.txt', 'utf-8');
  return str.trim();
};

const readInputLines = () => {
  const str = fs.readFileSync('./input.txt', 'utf-8');
  return str.trim().split("\n");
}

module.exports = {
  readInput,
  readInputLines,
};
