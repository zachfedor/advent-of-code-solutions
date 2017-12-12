var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

const programs = {};
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  programs[parts[0]] = parts.slice(2).map(i => i.replace(/,/, ''));
}).on('close', () => {
  let groups = [];

  while (Object.keys(programs).length > 0) {
    let connections = [];
    function getConnections(programs, index) {
      const current = programs[index];
      delete programs[index];

      if (connections.indexOf(index) > -1) return;
      connections.push(index);
      current.forEach(p => getConnections(programs, p));
    }

    const next = Object.keys(programs)[0];
    getConnections(programs, next);
    groups.push(connections.length);
  }

  console.log(groups.length);
});

