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


// const countOrbits = map => {
//   return Object.keys(map).reduce((total, parent) => {
//     return total + map[parent].reduce((subtotal, child) => {
//       return subtotal + findRoute(map, child).length;
//     }, 0);
//   }, 0);
// };


const findTransfers = (map, a, b) => {
  let routeA = findRoute(map, a);
  let routeB = findRoute(map, b);
  
  return routeA.filter(x => !routeB.includes(x)).length +
         routeB.filter(y => !routeA.includes(y)).length;
};


fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const map = parseOrbits(data.toString());
  console.log(findTransfers(map, 'YOU', 'SAN'));
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
// K)L
// K)YOU
// I)SAN`;
// const map = parseOrbits(test);
// console.log(findTransfers(map, 'YOU', 'SAN'));
