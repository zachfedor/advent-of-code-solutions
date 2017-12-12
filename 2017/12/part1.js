var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const programs = {};
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  programs[parts[0]] = parts.slice(2).map(i => i.replace(/,/, ''));
}).on('close', () => {
  let connections = [];

  function getConnections(programs, current = '0') {
    if (connections.indexOf(current) > -1) return;
    connections.push(current);
    programs[current].forEach(p => getConnections(programs, p));
  }

  getConnections(programs);
  console.log(connections.length);
});

