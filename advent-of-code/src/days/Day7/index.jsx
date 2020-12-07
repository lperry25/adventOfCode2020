import React, { useState } from 'react';

export function Day7() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Luggage Processing</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  const allBagRules =  input.split('\n');
  let bagRules = allBagRules;

  let lookForBags = ['shiny gold'];
  let bagIndex = 0;
  do {
    bagRules = bagRules.filter(rule => {
      const ruleSplit = rule.split('bags contain');
      const includesTheBag = ruleSplit[1].includes(lookForBags[bagIndex]);
      if (includesTheBag){
        lookForBags.push(ruleSplit[0]);
      }
      return !includesTheBag;
    })
    bagIndex ++;
  } while(bagIndex < lookForBags.length);

  const uniqueBags = lookForBags.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  })

  return <div>
    {inputTextArea}
    <p>There are {allBagRules.length} groups looking for help</p>
    <p>There are <b>{uniqueBags.length - 1}</b> bags that can hold a shiny gold bag</p>
    <p>There are <b>{uniqueBags.length - 1}</b> bags inside my shiny gold bag</p>
    <br/>

  </div>
}