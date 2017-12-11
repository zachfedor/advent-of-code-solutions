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

  function getStepsBack(coords) {
    let steps = 0;
    let x = Math.abs(coords[0]);
    let y = Math.abs(coords[1]);
    while (x > 0) {
      x -= 0.5;
      y += y < 0 ? 0.5 : -0.5;
      ++steps;
    }
    return steps + y;
  }

  function findFurthest(steps) {
    const locations = steps.trim().split(',').reduce((coords, step) => {
      const next = getNextLocation(coords[coords.length - 1], step)
      return [ ...coords, next];
    }, [[0,0]]);

    return locations.map(location => getStepsBack(location))
      .reduce((acc, cur) => acc > cur ? acc : cur);
  }

  console.log(findFurthest(input));
});

