// Day four

const start = 145852;
const end = 616942;

const doubleNum = n => {
  return (n.indexOf('111') == -1 && n.indexOf('11') > -1)
  || (n.indexOf('222') == -1 && n.indexOf('22') > -1)
  || (n.indexOf('333') == -1 && n.indexOf('33') > -1)
  || (n.indexOf('444') == -1 && n.indexOf('44') > -1)
  || (n.indexOf('555') == -1 && n.indexOf('55') > -1)
  || (n.indexOf('666') == -1 && n.indexOf('66') > -1)
  || (n.indexOf('777') == -1 && n.indexOf('77') > -1)
  || (n.indexOf('888') == -1 && n.indexOf('88') > -1)
  || (n.indexOf('999') == -1 && n.indexOf('99') > -1)
  || (n.indexOf('000') == -1 && n.indexOf('00') > -1);
};
const sortNum = n => n.split('').sort().join('');

const possiblePwds = (start, end) => {
  let possibles = 0;

  while (start < end) {
    let str = String(start);
    if (doubleNum(str) && str === sortNum(str)) {
      possibles += 1;
    }
    start += 1;
  }

  return possibles;
};

console.log(possiblePwds(start, end));
