const fs = require('fs');

fs.readFile('input.txt', (err, input) => {
  if (err) throw err;
  const modules = input.toString().split('\n');

  const sum = modules.map(mass => Math.floor(mass / 3) - 2)
    .reduce((a, c) => a + c);
  
  console.log(sum);
});
