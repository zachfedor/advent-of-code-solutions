// let input = [0, 2, 7, 0];
// let originalInput = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];
let loopedInput = [1,14,13,13,11,11,9,9,7,7,5,5,3,2,1,0];
let iterations = [];

while (iterations.indexOf(loopedInput.join()) === -1) {
  // add adjusted array to iterations
  iterations.push(loopedInput.join());
  // sort array and get largest number to distribute
  const blocks = [...loopedInput].sort((a, b) => b - a)[0];
  // find index after largest number in original array
  let bank = loopedInput.indexOf(blocks);
  // remove largest number from array
  loopedInput[bank] = 0;
  // increment items in array until done
  let nextBank = bank + 1;
  for (i = blocks; i > 0; i--) {
    nextBank = nextBank === loopedInput.length ? 0 : nextBank;
    loopedInput[nextBank] += 1;
    nextBank += 1;
  }
}

console.log(iterations.length, iterations[iterations.length - 1]);
