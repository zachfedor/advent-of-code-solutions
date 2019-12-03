// Day 02

const convert = text => text.split(',').map(n => Number(n));
const input = convert('1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,19,6,23,2,6,23,27,2,27,9,31,1,5,31,35,1,35,10,39,2,39,9,43,1,5,43,47,2,47,10,51,1,51,6,55,1,5,55,59,2,6,59,63,2,63,6,67,1,5,67,71,1,71,9,75,2,75,10,79,1,79,5,83,1,10,83,87,1,5,87,91,2,13,91,95,1,95,10,99,2,99,13,103,1,103,5,107,1,107,13,111,2,111,9,115,1,6,115,119,2,119,6,123,1,123,6,127,1,127,9,131,1,6,131,135,1,135,2,139,1,139,10,0,99,2,0,14,0');

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


for (let noun = 0; noun < 100; noun++) {
  let done = false;
  let verb = 0;
  for (; verb < 100; verb++) {
    let test = input.slice(0);
    test[1] = noun;
    test[2] = verb;

    if (compute(test)[0] == 19690720) {
      done = true;
      break;
    }
  }
  if (done) {
    console.log(100 * noun + verb);
    break;
  }
}

