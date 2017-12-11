fs = require('fs');
fs.readFile('input.txt', 'utf8', (err, input) => {
  if (err) console.log(err);

  function findLocation(steps) {
    return steps.trim().split(',').reduce((coords, step) => {
      switch (step) {
        case 'n':
          return [coords[0], coords[1] + 1];
        case 's':
          return [coords[0], coords[1] - 1];
        case 'ne':
          return [coords[0] + 0.5, coords[1] + 0.5];
        case 'nw':
          return [coords[0] - 0.5, coords[1] + 0.5];
        case 'se':
          return [coords[0] + 0.5, coords[1] - 0.5];
        case 'sw':
          return [coords[0] - 0.5, coords[1] - 0.5];
      }
    }, [0,0]);
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

  // console.log(getStepsBack(findLocation('ne,ne,ne')));
  // console.log(getStepsBack(findLocation('ne,ne,sw,sw')));
  // console.log(getStepsBack(findLocation('ne,ne,s,s')));
  // console.log(getStepsBack(findLocation('se,sw,se,sw,sw')));

  const end = findLocation(input);
  const stepsBack = getStepsBack(end);
  console.log(stepsBack);
});

