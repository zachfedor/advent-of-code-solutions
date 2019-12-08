// Day eight

const fs = require('fs');


const buildLayers = (str, w, h) => {
  const layers = [];

  while (str) {
    const layer = [];
    for (let row = 0; row < h; row++) {
      layer.push(str.slice(0, w).split(''));
      str = str.slice(w);
    }
    layers.push(layer);
  }

  return layers;
};


const findDigits = (n) => (array) => array.reduce((a, c) => {
  return a + c.filter(x => x == n).length;
}, 0);


fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const layers = buildLayers(data.toString(), 25, 6);

  const fewestZeroes = layers.map(findDigits(0))
  .reduce((acc, cur, ind) => {
    if (cur < acc.zeroes) {
      return { ind, zeroes: cur };
    }
    return acc;
  }, { ind: null, zeroes: Infinity }).ind;

  console.log(findDigits(1)(layers[fewestZeroes]) *
              findDigits(2)(layers[fewestZeroes]));
});
