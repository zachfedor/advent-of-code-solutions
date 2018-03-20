var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('test-input.txt'),
});

const addDistance = (sum, axis) => sum += Math.abs(axis);

let i = 0;
const particles = [];
lineReader.on('line', function (line) {
  const parts = line.split(', ')
    .map(p => {
      return p.replace(/p|a|v|=|<| |>/g, '')
        .split(',').map(i => parseInt(i, 11));
    });
  particles.push({
    p: parts[0],
    v: parts[1],
    a: parts[2],
    d: parts[0].reduce(addDistance, 0),
    i, 
  });
  i += 1;
}).on('close', () => {
  let closest = [];

  for (let i = 0; i < 4; i++) {
    particles.map((particle, index) => {
      console.log(particle.d);
      // move particles
      particle.v = particle.v.map((v, i) => v += particle.a[i]);
      particle.p = particle.p.map((p, i) => p += particle.v[i]);

      // measure manhattan distances
      particle.d = particle.p.reduce(addDistance, particle.d);
    });
  }

  console.log(particles.sort((a, b) => b.d - a.d)[0]);
});

