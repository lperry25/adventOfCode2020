import React, { useState } from 'react';

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

export function Day6() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Answering the customs declaration</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  const part1formattedInput = input.split('\n\n').map(val => val.split("\n").join(""));

  const countAnyYes = part1formattedInput.map((declaration) => {
    let count = 0;
    for (let i = 0; i < letters.length; i ++){
      if (declaration.indexOf(letters[i]) > -1) count++;
    }
    return count;
  }).reduce((a,b)=> a+b);

  const part2formattedInput = input.split('\n\n').map(val => val.split("\n"));
  const countEveryYes = part2formattedInput.map((group) => {
    if (group.length === 1) return group[0].length;
    let groupAfterFirst = group.slice(1, group.length);
    let count = 0;
    for (let i = 0; i < group[0].length; i ++){
      if (groupAfterFirst.every(dec => dec.indexOf(group[0][i]) > -1)) count++;
    }
    return count;
  }).reduce((a,b)=> a+b);

  return <div>
    {inputTextArea}
    <p>There are {part1formattedInput.length} groups looking for help</p>
    <p>There are <b>{countAnyYes}</b> yes answers for the declarations</p>
    <br/>
    <p>There are <b>{countEveryYes}</b> answers where the whole group answered the same</p>

  </div>
}