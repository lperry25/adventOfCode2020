import React, {useState} from 'react';
import {passports} from './day4input';


const isNum = (val) => !Number.isNaN(parseInt(val,10));

function checkValid(field, value){
  switch (field){
    case 'byr':
      return value >= 1920 && value <= 2002;
    case 'iyr':
      return value >= 2010 && value <= 2020;
    case 'eyr':
      return value >= 2020 && value <= 2030;
    case 'hgt':
      const isCm = value.includes('cm');
      const isInch = value.includes('in');
      if (!isCm && !isInch) return false;
      if (isCm) {
        const cmHeight = parseInt(value.replace('cm', ''),10);
        return cmHeight >= 150 && cmHeight <= 193;
      }
      const inchHeight = parseInt(value.replace('in', ''),10);
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
  const [input, setInput] = useState('');

  const inputTextArea = 
    <>
      <h1>Let's find some passports!</h1>
      <textarea id="day4-input" 
      value={input} 
      placeholder="Add your input file"
      onChange={({target}) => setInput(target.value)}/>
    </>;

  if (input === '') return inputTextArea;
  const formattedInput = input.split('\n\n').map(val => val.split("\n").join(" ") );

  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ];
  
  const validFieldsPassports = formattedInput.filter((passport) => {
    const fields = passport.split(' ');
    const length = fields.length;
    if (length < 7) return false;
    if (length === 8) return true;
    return fields.every(field => !field.includes('cid'));
  });

  const completelyValidPassports = validFieldsPassports.filter(passport => {
    const fields2 = passport.split(' ');
    return fields2.every(field2 => {
      const fieldValue = field2.split(':');
      return checkValid(fieldValue[0], fieldValue[1]);
    })
  });

  return <div>
      {inputTextArea}
    <p>All the passports have a length of {formattedInput.length}</p>
    <p>There are <b>{validFieldsPassports.length}</b> passports with the correct fields</p>
    <p>There are <b>{completelyValidPassports.length}</b> passports with valid fields</p>
  </div>
}