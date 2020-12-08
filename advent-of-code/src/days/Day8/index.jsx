import React, { useState } from 'react';

function runCodes(codeLines){
  let index = 0;
  let accum = 0;
  let answers = [];
  do {
    const currentCode = codeLines[index];
    if (currentCode[0] === 'jmp'){
      answers.push({storedIndex: index, accum, code: currentCode});
      if (parseInt(currentCode[1]) === 0) return {answers, completed: false};
      index += parseInt(currentCode[1]);
    } else if (currentCode[0] === 'acc'){
      if (answers.find(({storedIndex}) => storedIndex === index)) {
        return {answers, completed: false};
      }
      accum += parseInt(currentCode[1]);
      answers.push({storedIndex: index, accum, code: currentCode});
      index++;
    } else {
      answers.push({storedIndex: index, accum, code: currentCode});
      index ++;
    }
  }while (index < codeLines.length);
  return {answers, completed: true};
}

export function Day8() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Infinite Loop</h1>
      <textarea id="day4-input"
                value={input}
                placeholder="Add your input file"
                onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  let codeLines = input.split('\n').map(code => code.split(' '));
  //part 1
  const firstCodeRun = runCodes(codeLines).answers;
  const lastRun = firstCodeRun[firstCodeRun.length -1];

  //part 2
  const toggleCode = (code) => (code === 'jmp' ? 'nop' : 'jmp');
  const answerCodes = firstCodeRun.filter(({code}) => code[0] !== 'acc');
  const correctCode = answerCodes.map(({storedIndex, code}) =>
    runCodes([
      ...codeLines.slice(0, storedIndex),
      [toggleCode(code[0]),code[1]],
      ...codeLines.slice(storedIndex +1),
    ])
  ).filter(returned => returned.completed);


  return (<div>
    {inputTextArea}
    <p>There are {codeLines.length} baggage rules</p>
    <p>The loop happens at index <b>{lastRun?.storedIndex}</b> and the accum is at <b>{lastRun?.accum}</b> </p>
    <p>The correct code get accumulated to <b>{correctCode[0].answers[correctCode[0].answers.length -1].accum}</b> </p>
    <br/>

  </div>)
}