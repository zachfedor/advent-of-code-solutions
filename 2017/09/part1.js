fs = require('fs');
const testInputs = [
  '{}',
  '{{{}}}',
  '{{},{}}',
  '{{{},{},{{}}}}',
  '{<a>,<a>,<a>,<a>}',
  '{{<ab>},{<ab>},{<ab>},{<ab>}}',
  '{{<!!>},{<!!>},{<!!>},{<!!>}}',
  '{{<a!>},{<a!>},{<a!>},{<ab>}}',
];

function findScore(stream) {
  let skip = false;
  let junk = false;
  let score = 0;
  let total = 0;
  stream.split('').forEach(i => {
    if (!skip) {
      switch (i) {
        case '!':
          skip = true;
          break;
        case '{':
          if (!junk) {
            score += 1;
          }
          break;
        case '}':
          if (!junk) {
            total += score;
            score -= 1;
          }
          break;
        case '<':
          junk = true;
          break;
        case '>':
          junk = false;
          break;
        default:
          break;
      }
    } else {
      skip = false;
    }
  });
  return total;
}

// console.log(testInputs.map(i => findScore(i)));
fs.readFile('input.txt', 'utf8', (err, input) => {
  if (err) console.log(err);

  console.log(findScore(input));
});
