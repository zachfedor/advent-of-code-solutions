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

const renderRow = (back, front) => {
  return front.map((n, i) => n == 2 ? back[i] : n);
};

const renderLayers = (back, front) => {
  return front.map((row, ind) => renderRow(back[ind], row));
};


fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const layers = buildLayers(data.toString(), 25, 6);

  const image = layers.reverse()
  .reduce((back, front) => renderLayers(back, front))
  .map(row => row.join(''))
  .join('\n');

  console.log(image.replace(/0/g, ' ').replace(/1/g, '■'));
});

