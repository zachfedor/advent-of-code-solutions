var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let instructions = [];
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  instructions.push({
    register: parts[0],
    increment: parseInt(parts[1] === 'dec' ? parts[2] * -1 : parts[2]),
    condition: parts.slice(4),
  })
}).on('close', () => {
  const registers = instructions.reduce((acc, cur) => {
    if (!acc[cur.register]) {
      acc[cur.register] = 0;
    }

    if (!acc[cur.condition[0]]) {
      acc[cur.condition[0]] = 0;
    }

    if (eval(`acc.${cur.condition.join(' ')}`)) {
      acc[cur.register] += cur.increment;
    }

    if (acc[cur.register] > acc.highest) {
      acc.highest = acc[cur.register];
    }

    return acc;
  }, { highest: 0 });

  console.log(registers.highest);
});

