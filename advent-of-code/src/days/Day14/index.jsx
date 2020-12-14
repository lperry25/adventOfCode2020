import React, {useState} from 'react';

function padWithZero(bin) {
  const requiredZeros = 36 - bin.length;
  let fullString = '';
  for (let i = 0; i < requiredZeros; i++) fullString += '0';
  return fullString + bin;
}

function dec2bin(dec) {
  return padWithZero((dec >>> 0).toString(2));
}

String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function maskValue(mask, value, unChangedVal) {
  let newVal = value;
  for (let i = 0; i < 36; i++) {
    const maskChar = mask.charAt(i);
    if (maskChar !== unChangedVal) {
      newVal.replace(i, maskChar);
      newVal = newVal.substr(0, i) + maskChar + newVal.substr(i + 1);
    }
  }
  return newVal;
}

export function Day14() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Docking Data</h1>
      <textarea id="day4-input"
                value={input}
                placeholder="Add your input file"
                onChange={({target}) => setInput(target.value)}/>
    </>;

  if (input === '') return inputTextArea;
  const maskingData = input.split('\n').map(line => line.split(' = '));

  // part 1
  const memory = {};
  let currentMask;
  for (let i = 0; i < maskingData.length; i++) {
    const eq = maskingData[i];
    if (eq[0] !== 'mask') {
      memory[eq[0]] = maskValue(currentMask, dec2bin(eq[1]), 'X');
    } else {
      currentMask = eq[1];
    }
  }
  const integerArray = Object.values(memory).map(bin => bin ? parseInt(bin, 2) : 0);
  const sum = integerArray.reduce((a, b) => {
    if (a + b >= Number.MAX_SAFE_INTEGER) console.log('unsafe');
    return a + b;
  });

  // part 2
  const calculateMask = (mask) => {
    if (!mask.includes('X')) return [mask];
    return [...calculateMask(mask.replace('X', 0)), ...calculateMask(mask.replace('X', 1))];
  }

  const getMaskedLocations = (integer, mask) => {
    const maskedLocation = maskValue(mask, dec2bin(integer), '0');
    return calculateMask(maskedLocation);
  }

  const memory2 = {};
  for (let i = 0; i < maskingData.length; i++) {
    const eq = maskingData[i];
    // if (eq[0] !== 'mask' && (i === maskingData.length -1 || maskingData[i+1][0] === 'mask')){
    if (eq[0] !== 'mask') {
      const valueToStore = parseInt(eq[1], 10);
      const maskedLocation = getMaskedLocations(eq[0].slice(4, eq[0].length - 1), currentMask);
      for (let i = 0; i < maskedLocation.length; i++) {
        memory2[maskedLocation[i]] = valueToStore;
      }
    } else {
      currentMask = eq[1];
    }
  }
  const sum2 = Object.values(memory2).reduce((a, b) => a + b);

  return (<div>
    {inputTextArea}
    <p>There are {maskingData.length} lines to decode</p>
    <p>Part 1: The sum of numbers in memory is <b>{sum}</b></p>
    <p>Part 2: The sum of numbers in memory is <b>{sum2}</b></p>
    <br/>

  </div>)
}