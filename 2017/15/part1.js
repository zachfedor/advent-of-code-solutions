let matches = 0;
// inputs
let genA = 116;
let genB = 299;
// test inputs
// let genA = 65;
// let genB = 8921;

function judge(a, b) {
  const binA = a.toString(2).split('').slice(-16).join('');
  const binB = b.toString(2).split('').slice(-16).join('');
  if (binA === binB) {
    ++matches;
  }
}

for (let i = 0; i < 40000000; ++i) {
  genA = (16807 * genA) % 2147483647;
  genB = (48271 * genB) % 2147483647;
  judge(genA, genB);
}

console.log(matches);
