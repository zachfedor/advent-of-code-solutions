var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let lines = [];
lineReader.on('line', function (line) {
  lines.push(parseInt(line)); 
}).on('close', () => {
  let index = 0;
  let motion = 0;
  let step = 0;
  // lines = [0, 3, 0, 1, -3];
  while (index >= 0 && index <= lines.length) {
    // console.log(`step ${step}`, lines, index, motion);
    step += 1;
    motion = lines[index];
    const offset = motion >= 3 ? -1 : 1;
    lines[index] += offset;
    index = motion + index;
  }
  console.log(step - 1);
});

