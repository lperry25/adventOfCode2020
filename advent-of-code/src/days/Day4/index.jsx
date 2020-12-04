import React, { useState } from 'react';

function checkHeight(height) {
      if (height.includes('cm')){
        const cmHeight = parseInt(height.replace('cm', ''), 10);
        return cmHeight >= 150 && cmHeight <= 193;
      }
      if (!height.includes('in')) return false;
      const inchHeight = parseInt(height.replace('in', ''), 10);
      return inchHeight >= 59 && inchHeight <= 76;
}

const fieldRules = {
  byr: (value) => value >= 1920 && value <= 2002,
  iyr: (value) => value >= 2010 && value <= 2020,
  eyr: (value) => value >= 2020 && value <= 2030,
  hgt: (value) => checkHeight(value),
  hcl: (value) => value.match(/^#[0-9A-F]{6}$/i),
  ecl: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  pid: (value) => value.length === 9 && value.split('').every(char => !Number.isNaN(parseInt(char, 10))),
  cid: (value) => true,
};

export function Day4() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Let's find some valid passports!</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  const formattedInput = input.split('\n\n').map(val => val.split("\n").join(" "));

  const validFieldsPassports = formattedInput.filter((passport) => {
    const fields = passport.split(' ');
    return fields.length === 8 || (fields.length === 7 && fields.every(field => !field.includes('cid')));
  });

  const completelyValidPassports = validFieldsPassports.filter(passport => {
    const fields2 = passport.split(' ');
    return fields2.every(field2 => {
      const [field, value] = field2.split(':');
      return fieldRules[field](value);
    })
  });

  return <div>
    {inputTextArea}
    <p>All the passports have a length of {formattedInput.length}</p>
    <p>There are <b>{validFieldsPassports.length}</b> passports with the correct fields</p>
    <p>There are <b>{completelyValidPassports.length}</b> passports with valid fields</p>
  </div>
}