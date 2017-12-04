var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt'),
});

function compareAnagram(wordA, wordB) {
  const a = wordA.split('');
  const b = wordB.split('');
  return a.length === b.length && a.sort().map((l, i) => {
    return b.sort()[i] === l;
  }).reduce((acc, cur) => acc && cur);
}
// console.log(compareAnagram('one', 'two'));
// console.log(compareAnagram('oiii', 'iiio'));
// console.log(compareAnagram('oiii', 'ioii'));
// console.log(compareAnagram('iiii', 'ioii'));
// console.log(compareAnagram('abcde', 'ecdab'));

function hasAnagrams(words) {
  return words.split(' ').map((w, i, a) => {
      return a.filter((w, i2) => i !== i2) // get other words in array
        .map(w2 => compareAnagram(w, w2)) // compare them to original word
        .reduce((acc, cur) => acc || cur); // find any mathces
    }).reduce((acc, cur) => acc || cur);
}
// console.log(hasAnagrams('one two three'));
// console.log(hasAnagrams('abcde xyz ecdab'));
// console.log(hasAnagrams('a ab abc abd abf abj'));
// console.log(hasAnagrams('iiii oiii ooii oooi oooo'));
// console.log(hasAnagrams('oiii ioii iioi iiio'));

let lines = [];
lineReader.on('line', function (line) {
  if (!hasAnagrams(line)) {
    lines.push(line); 
  }
}).on('close', () => {
  console.log(lines.length);
});

