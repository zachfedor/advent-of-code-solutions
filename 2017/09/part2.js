fs = require('fs');
const testInputs = [
  '<>',
  '<random characters>',
  '<<<<>',
  '<{!>}>',
  '<!!>',
  '<!!!>>',
  '<{o"i!a,<{i<a>',
];

function findGarbage(stream) {
  let skip = false;
  let junk = false;
  let total = 0;
  stream.split('').forEach(i => {
    if (skip) {
      skip = false;
    } else {
      switch (i) {
        case '!':
          skip = true;
          break;
        case '<':
          if (junk) {
            total += 1;
          } else {
            junk = true;
          }
          break;
        case '>':
          junk = false;
          break;
        default:
          if (junk) {
            total += 1;
          }
          break;
      }
    }
  });
  return total;
}

// console.log(testInputs.map(i => findGarbage(i)));
fs.readFile('input.txt', 'utf8', (err, input) => {
  if (err) console.log(err);

  console.log(findGarbage(input));
});
