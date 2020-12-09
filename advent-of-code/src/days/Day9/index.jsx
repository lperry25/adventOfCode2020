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
              onChange={({target})=> setPreambleLength(parseInt(target.value))}/>
    </>;

  if (input === '') return inputTextArea;
  let codeLines = input.split('\n').map(num => parseInt(num));
  console.log(codeLines);
  //part 1
  const invalidNumIndex = codeLines.findIndex((code, index) => {
    if (index < preambleLength) return false;
    const preamble = codeLines.slice(index-preambleLength,index);
    for (let i = 0; i < preamble.length; i++ ){
      for (let j = i + 1; j < preamble.length; j++){
        if (preamble[i] + preamble[j] === codeLines[index]) return false;
      }
    }
    return true;
  });
  const invalidNum = codeLines[invalidNumIndex];

  //part 2
  const accum = (a,b) => {
    console.log(a,b);
    const sum = a + b;
    return [sum, sum === invalidNumIndex, sum < invalidNumIndex];
  }
    const codeWeakness = codeLines.find((code,index) => {
      if (code > invalidNumIndex) return false;
      let sum = code;
      let secondIndex = index + 1;
      do{
        sum += codeLines[secondIndex];
        if (sum === invalidNumIndex) return true;
        secondIndex++;
      }while (sum < invalidNumIndex && secondIndex < codeLines.length);
      code.reduce(accum)
    });
    console.log(codeWeakness);


  return (<div>
    {inputTextArea}
    <p>There are {codeLines.length} numbers in the code</p>
    <p>The first invalid number is <b>{invalidNum}</b></p>
    <br/>

  </div>)
}