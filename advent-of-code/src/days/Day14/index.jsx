import React, { useState } from 'react';

function padWithZero(bin){
 const requiredZeros = 36 - bin.length;
 let fullString = '';
 for (let i = 0; i < requiredZeros; i++) fullString += '0';
 return fullString + bin;
}

function dec2bin(dec){
  return padWithZero((dec >>> 0).toString(2));
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function maskValue(mask, value){
  let newVal = value;
  for (let i = 0; i < 36; i++){
    const maskChar = mask.charAt(i);
    if (maskChar !== 'X'){
      newVal.replace(i, maskChar);
      newVal = newVal.substr(0, i) + maskChar + newVal.substr(i + 1 );
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
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  const maskingData = input.split('\n').map(line => line.split(' = '));

  const memory = [];

  let currentMask = '';
  for (let i = 0; i < maskingData.length; i ++){
    const eq = maskingData[i];
    if (eq[0] !== 'mask'){
      const memPos = eq[0].split('[');
      memory[parseInt(memPos[1].substr(0, memPos.length -1))] = maskValue(currentMask, dec2bin(eq[1]));
    }
    else{
      currentMask = eq[1];
    }
  }
  const sum = memory.map(bin => bin ? parseInt(bin,2) : 0).reduce((a,b)=> a+b);

  return (<div>
    {inputTextArea}
    <p>There are {maskingData.length} lines to decode</p>
    <p>Part 1: The sum of numbers in memory is <b>{sum}</b></p>
    {/*<p>Part 2: The manhattanDistance is <b>{manhattanDistance2}</b></p>*/}
    <br />

  </div>)
}