// const input = 23;
const input = 361527;

function abs(x) {
  return x < 0 ? x * -1 : x;
}

function getNextDirection(coords, lastCoords, lastDirection) {
  if (coords[0] === 0 && coords[1] === 0) return 'r';
  if (coords[0] === 1 && coords[1] === 0) return 'u';

  const absX = abs(coords[0]);
  const absY = abs(coords[1]);
  if (absX !== absY) {
    const lastXIsNegative = lastCoords[0] < 0;
    const lastYIsNegative = lastCoords[1] < 0;
    const lastAbsX = abs(lastCoords[0]);
    const lastAbsY = abs(lastCoords[1]);
    if(lastAbsX === lastAbsY && !lastXIsNegative && lastYIsNegative) {
      // console.log('new spiral');
      return 'u';
    }

    // console.log('edge', absX, absY);
    // not at a corner, keep going
    return lastDirection;
  }

  const xIsNegative = coords[0] < 0;
  const yIsNegative = coords[1] < 0;
  if (!xIsNegative && !yIsNegative) {
    // console.log('top right');
    return 'l';
  } else if (xIsNegative && !yIsNegative) {
    // console.log('top left');
    return 'd';
  } else if (xIsNegative && yIsNegative) {
    // console.log('bottom left');
    return 'r';
  } else if (!xIsNegative && yIsNegative) {
    // console.log('bottom right, end of one spiral');
    return 'r';
  } else {
    console.log('err:', coords, xIsNegative, yIsNegative);
  }
}

function getMotion(direction) {
  switch (direction) {
    case 'r':
      return [1, 0];
    case 'u':
      return [0, 1];
    case 'l':
      return [-1, 0];
    case 'd':
      return [0, -1];
  }
}

function getCoords(i) {
  const range = [...Array(i).keys()].map(i => ++i);
  return range.reduce((acc, cur) => {
    if (cur === 1) {
      return {
        coords: [0,0],
        nextDirection: 'r',
      };
    }

    const motion = getMotion(acc.nextDirection);
    const newX = acc.coords[0] + motion[0];
    const newY = acc.coords[1] + motion[1];
    const coords = [newX, newY];
    const nextDirection = getNextDirection(coords, acc.coords, acc.nextDirection);
    // console.log(cur, coords, nextDirection);  

    return {
      coords,
      nextDirection,
    };
  }, {});
}

function isSurrounding(a, b) {
  if (a[0] + 1 === b[0] && a[1] === b[1]) return 'e';
  if (a[0] - 1 === b[0] && a[1] === b[1]) return 'w';
  if (a[0] === b[0] && a[1] + 1 === b[1]) return 'n';
  if (a[0] === b[0] && a[1] - 1 === b[1]) return 's';
  if (a[0] + 1 === b[0] && a[1] + 1 === b[1]) return 'ne';
  if (a[0] - 1 === b[0] && a[1] + 1 === b[1]) return 'nw';
  if (a[0] + 1 === b[0] && a[1] - 1 === b[1]) return 'se';
  if (a[0] - 1 === b[0] && a[1] - 1 === b[1]) return 'sw';
  return false;
}

let grid = [{ val: 1, coords: [0,0] }];
while (grid[grid.length - 1].val <= input) {
  // find coords of next value
  const coords = getCoords(grid.length + 1).coords;
  // find surrounding numbers
  const val = grid.filter(i => isSurrounding(coords, i.coords))
    // add all surrounding numbers together
    .reduce((acc, cur) => acc + cur.val, 0);
  // push new value to grid
  grid.push({ val, coords });
}

// console.log(grid);
console.log(grid[grid.length - 1].val);

