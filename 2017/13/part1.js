var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const layers = [];
lineReader.on('line', function (line) {
  const parts = line.split(':').map(p => parseInt(p.trim(), 10));
  layers[parts[0]] = parts[1];
}).on('close', () => {
  function getScannerIndex(depth, time) {
    const p = depth * 2 - 2;
    const q = time % p;
    return q > (depth - 1) ? (p - q) : q;
  }

  const severity = layers.reduce((acc, cur, index) => {
    if (cur === undefined) return acc;
    return getScannerIndex(cur, index) === 0 ? acc + (cur * index) : acc;
  }, 0);
  console.log(severity);
});

