var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

function findBase(programs) {
  const haveDisc = Object.keys(programs)
    .map(p => programs[p])
    .filter(p => p.onDisc.length > 0);
  const areOnDisc = haveDisc.map(p => p.onDisc)
    .reduce((acc, cur) => acc.concat(cur), []);

  return Object.keys(programs).filter(n => areOnDisc.indexOf(n) === -1)[0];
}

function buildTower(programs, baseName) {
  const program = programs[baseName];
  if (program.onDisc.length === 0) {
    return program;
  }
  return {
    ...program,
    onDisc: program.onDisc.map(p => buildTower(programs, p)),
  };
}

function measureWeight(program) {
  if (program.onDisc.length === 0) {
    return program.weight;
  }
  return program.weight + program.onDisc.reduce((acc, cur) => acc + measureWeight(cur), 0);
}

function findUnique(arr) {
  const first = arr[0];
  if(arr.slice(1).indexOf(first) === -1) {
    return {
      index: 0,
      comparedTo: arr[1],
    };
  }
  return {
    index: arr.findIndex(i => i !== first),
    comparedTo: first,
  };
}

function findImbalance(tower, comparedTo) {
  const branches = tower.onDisc.map(i => measureWeight(i))
  const isBalanced = branches.length > 0 ? branches.every(i => i === branches[0]) : true;

  if (isBalanced) {
    const targetWeight = comparedTo - branches.reduce((acc, cur) => acc + cur, 0);
    return `${tower.name} should weigh ${targetWeight}`;
  }

  const unique = findUnique(branches);
  return findImbalance(tower.onDisc[unique.index], unique.comparedTo);
}

const programs = {};
lineReader.on('line', function (line) {
  const parts = line.split(' ');
  const weight = parseInt(parts[1].split('').slice(1, -1).join(''));
  const onDisc = parts.slice(3).map(i => i.replace(/,/, ''));
  programs[parts[0]] = {
    name: parts[0],
    onDisc,
    weight,
  }; 
}).on('close', () => {
  const base = findBase(programs);
  const tower = buildTower(programs, base);

  console.log(findImbalance(tower));
});
