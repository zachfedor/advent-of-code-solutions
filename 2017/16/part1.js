fs = require('fs');

function spin(programs, i) {
  return [...programs.slice(-i), ...programs.slice(0, -i)];
}

function exchange(programs, a, b) {
  const tmp = programs[a];
  programs[a] = programs[b];
  programs[b] = tmp;
  return programs;
}

function partner(programs, a, b) {
  const x = programs.indexOf(a);
  const y = programs.indexOf(b);
  return exchange(programs, x, y);
}

function dance(initial, input) {
  const steps = input.split(',');

  return steps.reduce((programs, step) => {
    switch (step[0]) {
      case 's':
        return spin(programs, parseInt(step.slice(1)));
      case 'x':
        const xs = step.slice(1).split('/');
        return exchange(programs, parseInt(xs[0]), parseInt(xs[1]));
      case 'p':
        const ps = step.slice(1).split('/');
        return partner(programs, ps[0], ps[1]);
    }
  }, initial).join('');
}

fs.readFile('input.txt', 'utf8', (err, input) => {
  if (err) console.log(err);

  // const initialTest = ['a','b','c','d','e'];
  const initial = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];
  
  // console.log(dance(initialTest, 's1,x3/4,pe/b'));
  console.log(dance(initial, input));
});
