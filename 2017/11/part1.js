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

  // console.log(findLocation('ne,ne,ne'));
  // console.log(findLocation('ne,ne,sw,sw'));
  // console.log(findLocation('ne,ne,s,s'));
  // console.log(findLocation('se,sw,se,sw,sw'));

  const end = findLocation(input);
  const stepsBack = Math.abs(end[0]) + Math.abs(end[1]);
  console.log(stepsBack);
});

