var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const programs = [];
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  const weight = parseInt(parts[1].split('').slice(1, -1).join(''));
  const onDisc = parts.slice(3).map(i => i.replace(/,/, ''));
  programs.push({ name: parts[0], onDisc, weight }); 
}).on('close', () => {
  const areOnDisc = programs
    .filter(p => p.onDisc.length > 0)
    .map(p => p.onDisc)
    .reduce((acc, cur) => acc.concat(cur), []);

  const base = programs.filter(p => areOnDisc.indexOf(p.name) === -1)[0];
  console.log(base.name);
});
