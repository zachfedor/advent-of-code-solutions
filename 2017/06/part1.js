// let input = [0, 2, 7, 0];
let input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];
let iterations = [];

while (iterations.indexOf(input.join()) === -1) {
  // add adjusted array to iterations
  iterations.push(input.join());
  // sort array and get largest number to distribute
  const blocks = [...input].sort((a, b) => b - a)[0];
  // find index after largest number in original array
  let bank = input.indexOf(blocks);
  // remove largest number from array
  input[bank] = 0;
  // increment items in array until done
  let nextBank = bank + 1;
  for (i = blocks; i > 0; i--) {
    nextBank = nextBank === input.length ? 0 : nextBank;
    input[nextBank] += 1;
    nextBank += 1;
  }
}

console.log(iterations.length);
