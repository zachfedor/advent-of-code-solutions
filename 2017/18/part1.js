var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const instructions = [];
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  instructions.push({ c: parts[0], x: parts[1], y: parts[2] });
}).on('close', () => {
  let i = 0;
  let recovered = null;
  let song = [];
  let state = {};
  [...Array(26).keys()]
    .map(i => String.fromCharCode(i + 97))
    .forEach(l => { state[l] = 0; });

  const getVal = (n) => isNaN(n) ? state[n] : parseInt(n, 10);

  while (recovered === null && i >= 0 && i < instructions.length) {
    let offset = 1;
    let { c, x, y } = instructions[i];

    if (c === 'snd') {
      song.push(getVal(x));
    } else if (c === 'set') {
      state[x] = getVal(y);
    } else if (c === 'add') {
      state[x] += getVal(y);
    } else if (c === 'mul') {
      state[x] *= getVal(y);
    } else if (c === 'mod') {
      state[x] %= getVal(y);
    } else if (c === 'rcv') {
      if (getVal(x) !== 0) {
        recovered = song[song.length - 1];
      }
    } else if (c === 'jgz') {
      if (getVal(x) > 0) {
        offset = getVal(y);
      }
    }

    i += offset;
  }

  console.log(recovered);
});

