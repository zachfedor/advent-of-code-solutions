const input = '120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113';

function findLengths(bytes) {
  const suffix = [17, 31, 73, 47, 23];
  return [
    ...bytes.split('').map(b => b.charCodeAt(0)),
    ...suffix,
  ];
}

function getSparseHash(lengths) {
  const list = {};
  const listSize = 256;
  let current = 0;
  let skip = 0;
  for (i = 0; i < listSize; i++) {
    list[i] = i;
  }

  for (i = 0; i < 64; i++) {
    lengths.forEach(length => {
      if (length <= listSize) {
        const range = [...Array(length).keys()].map(i => {
          return (i + current < listSize) ? i + current : i + current - listSize;
        });
        const sublist = range.map(i => list[i]);
        const reversed = [...sublist].reverse();

        let y = 0;
        range.forEach(i => {
          list[i] = reversed[y++];
        });

        current = (current + length + skip) % listSize;
        ++skip;
      }
    });
  }
  return Object.keys(list).map(i => list[i]);
}

function getDenseHash(input) {
  const lengthSequence = findLengths(input);
  const sparseHash = getSparseHash(lengthSequence);

  const chunks = [];
  while (sparseHash.length > 0) {
    chunks.push(sparseHash.splice(0, 16));
  }

  const hash = chunks.map(chunk => {
    const xor = chunk.reduce((acc, cur) => acc ^ cur);
    const hex = xor.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  });

  return hash.join('');
}

// test inputs
// console.log(getDenseHash('') === 'a2582a3a0e66e6e86e3812dcb672a272');
// console.log(getDenseHash('AoC 2017') === '33efeb34ea91902bb2f59c9920caa6cd');
// console.log(getDenseHash('1,2,3') === '3efbe78a8d82f29979031a4aa0b16a9d');
// console.log(getDenseHash('1,2,4') === '63960835bcdc130f0b66d7ff4f6a5a8e');

console.log(getDenseHash(input));
