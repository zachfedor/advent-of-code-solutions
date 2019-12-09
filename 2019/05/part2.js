// Day 02

const fs = require('fs');

const compute = (intcodes, stdin) => {
  let i = 0;
  while (i < intcodes.length) {
    let op = intcodes[i];
    let modes = [0,0,0];

    if (op > 8) {
      let str = op.toString().padStart(5, '0');
      op = Number(str.slice(3));
      modes = str.slice(0, 3).split('').reverse().map(n => Number(n));
    }

    // Get Params
    // if mode is immediate, use as value. else use as reference
    const a = modes[0] ? intcodes[i + 1] : intcodes[intcodes[i + 1]];
    const b = modes[1] ? intcodes[i + 2] : intcodes[intcodes[i + 2]];
    const c = intcodes[i + 3];

    if (op == 99) { // HALT
      return intcodes;
    } else if (op == 1) { // ADD
      intcodes[c] = a + b;
      i += 4;
    } else if (op == 2) { // MULTIPLY
      intcodes[c] = a * b;
      i += 4;
    } else if (op == 3) { // INPUT
      intcodes[intcodes[i + 1]] = stdin;
      i += 2;
    } else if (op == 4) { // OUTPUT
      console.log('output', a);
      i += 2;
    } else if (op == 5) { // JUMP-IF-TRUE
      i = a > 0 ? b : i + 3;
    } else if (op == 6) { // JUMP-IF-FALSE
      i = a == 0 ? b : i + 3;
    } else if (op == 7) { // LESS-THAN
      intcodes[c] = a < b ? 1 : 0;
      i += 4;
    } else if (op == 8) { // EQUALS
      intcodes[c] = a == b ? 1 : 0;
      i += 4;
    } else console.error('Bad opcode:', op);
  }
};

const convert = text => text.split(',').map(n => Number(n));

fs.readFile('input.txt', (err, data) => {
  const input = data.toString();

  compute(convert(input), 5);
});



// Tests: Equal and Less Than
// console.log(compute(convert('3,9,8,9,10,9,4,9,99,-1,8'), 8)); // input equal to 8?
// console.log(compute(convert('3,9,7,9,10,9,4,9,99,-1,8'), 8)); // input less than 8?
// console.log(compute(convert('3,3,1108,-1,8,3,4,3,99'), 8)); // input equal to 8 in immediate mode?
// console.log(compute(convert('3,3,1107,-1,8,3,4,3,99'), 8)); // input less than 8 in immediate mode?

// Tests: Jumps
// console.log(compute(convert('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'), 100)); // output 0 if input is 0, else 1
// console.log(compute(convert('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'), 100)); // same, but immediate mode

// Big Test
// const bigtest = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
// compute(convert(bigtest), 88); // output 999 if input < 8, 1000 if input == 8, else 1001

