// Day four

const start = 145852;
const end = 616942;

const doubleNum = /(\d)(\1)/;
const sortNum = n => n.split('').sort().join('');

const possiblePwds = (start, end) => {
  let possibles = 0;

  while (start < end) {
    let str = String(start);
    if (doubleNum.test(str) && str === sortNum(str)) {
      possibles += 1;
    }
    start += 1;
  }

  return possibles;
};

console.log(possiblePwds(start, end));
