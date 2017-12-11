fs = require('fs');
fs.readFile('input.txt', 'utf8', (err, input) => {
  if (err) console.log(err);

  function getNextLocation(current, direction) {
    switch (direction) {
      case 'n':
        return [current[0], current[1] + 1];
      case 's':
        return [current[0], current[1] - 1];
      case 'ne':
        return [current[0] + 0.5, current[1] + 0.5];
      case 'nw':
        return [current[0] - 0.5, current[1] + 0.5];
      case 'se':
        return [current[0] + 0.5, current[1] - 0.5];
      case 'sw':
        return [current[0] - 0.5, current[1] - 0.5];
    }
  }

  function findFurthest(steps) {
    const locations = steps.trim().split(',').reduce((coords, step) => {
      const next = getNextLocation(coords[coords.length - 1], step)
      return [ ...coords, next];
    }, [[0,0]]);

    return locations.map(l => Math.abs(l[0]) + Math.abs(l[1]))
      .reduce((acc, cur) => acc > cur ? acc : cur);
  }

  console.log(findFurthest(input));
});

