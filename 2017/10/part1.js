const input = [120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113];
const testInput = [3,4,1,5];

function tieKnot(lengths, listSize) {
  let current = skip = 0;
  let list = {};
  [...Array(listSize).keys()].forEach(i => list[i] = i);

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

      const move = current + length + skip;
      current = move < listSize ? move : move - listSize;
      ++skip;
    }
  });
  return list[0] * list[1];
}

console.log(tieKnot(input, 256));
