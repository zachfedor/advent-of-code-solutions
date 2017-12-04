var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

let lines = [];
lineReader.on('line', function (line) {
  const words = line.split(' ');  
  const filtered = words.filter((w, i, a) => a.indexOf(w) === i);

  if (filtered.length === words.length) {
    lines.push(line); 
  }
}).on('close', () => {
  console.log(lines.length);
});
