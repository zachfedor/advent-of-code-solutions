// Day 02

const fs = require('fs');

const compute = (intcodes, stdin) => {
  let i = 0;
  while (i < intcodes.length) {
    let op = intcodes[i];
    let params = [0,0,0];

    if (op > 4) {
      let str = op.toString().padStart(5, '0');
      op = Number(str.slice(3));
      params = str.slice(0, 3).split('').reverse().map(n => Number(n));
    }

    if (op == 99) return intcodes;

    if (op == 1 || op == 2) {
      // if mode is immediate, use as value. else use as reference
      const a = params[0] ? intcodes[i + 1] : intcodes[intcodes[i + 1]];
      const b = params[1] ? intcodes[i + 2] : intcodes[intcodes[i + 2]];
      const pos = intcodes[i + 3];

      if (op == 1) intcodes[pos] = a + b;
      else if (op == 2) intcodes[pos] = a * b;
    } else if (op == 3 || op == 4) {
      const pos = intcodes[i + 1];

      if (op == 3) intcodes[pos] = stdin;
      else if (op == 4) console.log('output', params[0] ? pos : intcodes[pos]);
    } else console.error('Bad opcode:', op);

    i += op < 3 ? 4 : 2;
  }
};

const convert = text => text.split(',').map(n => Number(n));

// console.log(compute(convert('3,0,4,0,99'), 1));
// console.log(compute(convert('1002,4,3,4,33'), 1));
// console.log(compute(convert('1101,100,-1,4,0'), 0));


fs.readFile('input.txt', (err, data) => {
  const input = data.toString();

  compute(convert(input), 1);
});


