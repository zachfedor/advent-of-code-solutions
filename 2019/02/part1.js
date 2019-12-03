// Day 02

const fs = require('fs');

const compute = intcodes => {
  for (let i = 0; i < intcodes.length; i += 4) {
    // console.log(intcodes.slice(i, i+4), intcodes[intcodes[i + 1]], intcodes[intcodes[i + 2]]);

    if (intcodes[i] == 99) return intcodes;

    const a = intcodes[intcodes[i + 1]];
    const b = intcodes[intcodes[i + 2]];
    const pos = intcodes[i + 3];

    if (intcodes[i] == 1) intcodes[pos] = a + b;
    else if (intcodes[i] == 2) intcodes[pos] = a * b;
    else console.error('Bad opcode');
  }
};

const convert = text => text.split(',').map(n => Number(n));

fs.readFile('input.txt', (err, input) => {
  if (err) throw err;

  let oldIntcodes = convert(input.toString());
  oldIntcodes[1] = 12;
  oldIntcodes[2] = 2;

  console.log(compute(oldIntcodes)[0]);
});

/* Tests
console.log(compute(convert('1,0,0,0,99')));
console.log(compute(convert('2,3,0,3,99')));
console.log(compute(convert('2,4,4,5,99,0')));
console.log(compute(convert('1,1,1,4,99,5,6,0,99')));
*/

