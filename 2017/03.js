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

const finalCoords = getCoords(361527).coords;
const steps = abs(finalCoords[0]) + abs(finalCoords[1]);
console.log(steps);

