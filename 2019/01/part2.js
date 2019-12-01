const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
  if (err) throw err;
  const modules = input.toString().split('\n');

  const fuelCalc = mass => Math.floor(mass / 3) - 2;

  let sum = modules.map(module => {
    let fuel = fuelCalc(module);
    let newDifference = fuelCalc(fuel);
    while (newDifference > 0) {
      fuel += newDifference;
      newDifference = fuelCalc(newDifference);
    }
    return fuel;
  }).reduce((a, c) => a + c);
  
  console.log(sum);
});
