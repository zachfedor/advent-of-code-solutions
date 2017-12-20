var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const lines = [];
lineReader.on('line', function (line) {
  lines.push(line.split(''));
}).on('close', () => {
  function getNewDirection(cx, cy, direction) {
    if (direction === 'e' || direction === 'w') {
      // if row above exists and that row/col isn't a space
      const canGoNorth = lines[cy - 1] && lines[cy - 1][cx] !== ' '; 
      return canGoNorth ? 'n' : 's';
    } else {
      // if column to east exists and that row/col isn't a space
      const canGoEast = lines[cy][cx + 1] && lines[cy][cx + 1] !== ' ';
      return canGoEast ? 'e' : 'w';
    }
  }

  let y = 0;
  let x = lines[0].indexOf('|');
  let steps = 0;
  let dir = 's';
  while (dir !== null && y >= 0 && y < lines.length && x >= 0 && x < lines[0].length) {
    let i = lines[y][x];
    while (i === '|' || i === '-' || i === '.') {
      // 1. travel till you find something other than '|' or '-'
      if (dir === 'n') y -= 1;
      else if (dir === 's') y += 1;
      else if (dir === 'e') x += 1;
      else if (dir === 'w') x -= 1;

      i = lines[y][x];
      steps += 1;
    }
    if (i === '+') {
      // 2. is it '+'? get new direction. go back to 1
      dir = getNewDirection(x, y, dir);
      lines[y][x] = '.';
    } else if (i === ' ' || i === undefined) {
      // we're done
      dir = null;
    } else {
      // 3. is it letter? go back to 1
      lines[y][x] = '.';
    }
  }

  console.log(steps);
});

