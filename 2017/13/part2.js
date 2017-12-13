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

  function gotCaught(delay) {
    let caught = false;
    let index = 0;
    while (!caught && index < layers.length) {
      if (layers[index] !== undefined) {
        caught = getScannerIndex(layers[index], index + delay) === 0;
      }
      ++index;
    }
    return caught;
  }

  let delay = 0;
  while (gotCaught(delay)) {
    ++delay;
  }
  console.log(delay);
});

