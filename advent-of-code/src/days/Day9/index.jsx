import React, { useState } from 'react';

export function Day9() {
  const [input, setInput] = useState('');
  const [preambleLength, setPreambleLength] = useState(25);

  const inputTextArea =
    <>
      <h1>Cracking the port code</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
      <input placeholder="Preamble Length" value={preambleLength}
        onChange={({ target }) => setPreambleLength(parseInt(target.value))} />
    </>;

  if (input === '') return inputTextArea;
  let codeLines = input.split('\n').map(num => parseInt(num));
  console.log(codeLines);
  //part 1
  const invalidNumIndex = codeLines.findIndex((code, index) => {
    if (index < preambleLength) return false;
    const preamble = codeLines.slice(index - preambleLength, index);
    for (let i = 0; i < preamble.length; i++) {
      for (let j = i + 1; j < preamble.length; j++) {
        if (preamble[i] + preamble[j] === codeLines[index]) return false;
      }
    }
    return true;
  });
  const invalidNum = codeLines[invalidNumIndex];

  //part 2
  let secondIndex;
  const codeWeakness = codeLines.findIndex((code, index) => {
    if (code > invalidNum) return false;
    let sum = code;
    secondIndex = index + 1;
    do {
      sum += codeLines[secondIndex];
      if (sum === invalidNum) return true;
      secondIndex++;
    } while (sum < invalidNum && secondIndex < codeLines.length - 1);
    return false;
  });

  const range = codeLines.slice(codeWeakness, secondIndex + 1);
  const codeBreakSum = Math.min(...range) + Math.max(...range);



  return (<div>
    {inputTextArea}
    <p>There are {codeLines.length} numbers in the code</p>
    <p>The first invalid number is <b>{invalidNum}</b></p>
    <p>The encryption weakness in my XMAS-encrypted list of numbers is <b>{codeBreakSum}</b></p>
    <br />

  </div>)
}