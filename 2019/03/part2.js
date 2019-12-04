// Day Three

const fs = require('fs');

const test0 = `R8,U5,L5,D3
U7,R6,D4,L4`;
const test1 = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`;
const test2 = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

const buildCoords = path => {
  const coords = [[0, 0]];
  for (let step of path) {
    let dir = step[0];

    for (let length = Number(step.slice(1)); length > 0; length--) {
      let [x, y] = coords[coords.length - 1];

      if (dir == 'U') {
        y += 1;
      } else if (dir == 'D') {
        y -= 1;
      } else if (dir == 'R') {
        x += 1;
      } else if (dir == 'L') {
        x -= 1;
      }

      coords.push([x, y]);
    }
  }

  return coords;
};

const flattenCoords = ([x,y]) => `${x},${y}`;

fs.readFile('input.txt', (err, input) => {
  if (err) throw err;
  const paths = input.toString()
  .split('\n')
  .map(path => path.split(','));

  const coords1 = buildCoords(paths[0]).map(flattenCoords);
  const coords2 = buildCoords(paths[1]).map(flattenCoords);

  const intersections = coords1.map((coords, ind1) => {
    let ind2 = coords2.indexOf(coords);
    return ind2 > -1 ? ind1 + ind2 : null;
  }).filter(steps => steps);
  intersections.shift();
  
  console.log(intersections.reduce((acc, cur) => acc < cur ? acc : cur));
});
