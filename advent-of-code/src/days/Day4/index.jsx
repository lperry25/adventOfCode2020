import React from 'react';
import {passports} from './day4input';


const isNum = (val) => !Number.isNaN(parseInt(val,10));

function checkValid(field, value){
  console.log(field,value);
  switch (field){
    case 'byr':
      if (!isNum(value)) return false;
      return value >= 1920 && value <= 2002;
    case 'iyr':
      if (!isNum(value)) return false;
      return value >= 2010 && value <= 2020;
    case 'eyr':
      if (!isNum(value)) return false;
      return value >= 2020 && value <= 2030;
    case 'hgt':
      const isCm = value.includes('cm');
      const isInch = value.includes('in');
      if (!isCm && !isInch) return false;
      if (isCm) {
        const cmHeight = parseInt(value.replace('cm', ''),10);
        if (!isNum(cmHeight)) return false;
        return cmHeight >= 150 && cmHeight <= 193;
      }
      const inchHeight = parseInt(value.replace('in', ''),10);
      if (!isNum(inchHeight)) return false;
      return inchHeight >= 59 && inchHeight <= 76;
    case 'hcl':
      if (value.charAt(0) !== '#') return false;
      const hairColor = value.replace('#', '');
      if (hairColor.length !== 6) return false;
      const validLetters = ['a','b','c','d','e','f'];
      return hairColor.split('').every( char => validLetters.includes(char) || isNum(char));
    case'ecl':
      const validEyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
      return validEyes.includes(value);
    case 'pid':
      if (value.length !== 9) return false;
      return value.split('').every(char => isNum(char));
    case 'cid':
      return true;
  }
}

export function Day4() {
  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ];
  const testData = ['ecl:gry pid:860033327 eyr:2020 hcl:#fffffd ' +
  'byr:1937 iyr:2017 cid:147 hgt:183cm',
  'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 ' +
  'hcl:#cfa07d byr:1929 ',
  'hcl:#ae17e1 iyr:2013 ' +
  'eyr:2024 ' +
  'ecl:brn pid:760753108 byr:1931 ' +
  'hgt:179cm',
  'hcl:#cfa07d eyr:2025 pid:166559648 ' +
  'iyr:2011 ecl:brn hgt:59in']
 /* const formatPassports = passports.map(passport => {
    const fields = passport.split(' ');
    return { fields: fields.reduce(field => {
      const fieldNameValue = field.split(':');
      return { [fieldNameValue[0]]: fieldNameValue[1] }
    })};
  });
  console.log(formatPassports);
  */
  const validPassportTest = ['pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 ' +
  'hcl:#623a2f',
  'eyr:2029 ecl:blu cid:129 byr:1989 ' +
  'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm',
  'hcl:#888785 ' +
  'hgt:164cm byr:2001 iyr:2015 cid:88 ' +
  'pid:545766238 ecl:hzl ' +
  'eyr:2022',
  'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719']
  const testedPassports = passports;
  let countPassportsOver6 = 0;
  const validFieldsPassports = testedPassports.filter((passport) => {
    const fields = passport.split(' ');
    const length = fields.length;
    if (length < 7) return false;
    countPassportsOver6++;
    if (length === 8) return true;
    return fields.every(field => !field.includes('cid'));
  });

  const completelyValidPassports = validFieldsPassports.filter(passport => {
    console.log(passport);
    const fields2 = passport.split(' ');
    console.log(fields2);
    return fields2.every(field2 => {
      console.log(field2);
      const fieldValue = field2.split(':');
      return checkValid(fieldValue[0], fieldValue[1]);
    })
  })
  console.log(completelyValidPassports);
  return <div>
    <h1>Let's find some passports!</h1>
    <p>All the passports have a length of {testedPassports.length}</p>
    <p>There are <b>{validFieldsPassports.length}</b> passports with the correct fields</p>
    <p>There are <b>{completelyValidPassports.length}</b> passports with valid fields</p>
  </div>
}