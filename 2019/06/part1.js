// Day six

const fs = require('fs');

const parseOrbits = string => {
  let map = {};
  for (let orbit of string.split('\n')) {
    let [parent, child] = orbit.split(')');
    if (map[parent]) map[parent].push(child);
    else map[parent] = [child];
  }
  return map;
};


const findRoute = (map, element, route = []) => {
  if (element === 'COM') return route;

  for (let key in map) {
    if (map[key].includes(element)) {
      return findRoute(map, key, [key, ...route]);
    }
  }
};


const countOrbits = map => {
  return Object.keys(map).reduce((total, parent) => {
    return total + map[parent].reduce((subtotal, child) => {
      return subtotal + findRoute(map, child).length;
    }, 0);
  }, 0);
};


fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const map = parseOrbits(data.toString());
  console.log(countOrbits(map));
});

// const test = `COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`;
// const map = parseOrbits(test);
// console.log(map);
// console.log(findRoute(map, 'COM').length)
// console.log(findRoute(map, 'H').length);
// console.log(countOrbits(map));
