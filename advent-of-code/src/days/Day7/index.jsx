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
  const allBagRules =  input.split('\n').map(rule => rule.split(' bags contain '));
  let bagRules = allBagRules;

  let lookForBags = ['shiny gold'];
  let bagIndex = 0;
  do {
    bagRules = bagRules.filter(rule => {
      const includesTheBag = rule[1].includes(lookForBags[bagIndex]);
      if (includesTheBag){
        lookForBags.push(rule[0]);
      }
      return !includesTheBag;
    })
    bagIndex ++;
  } while(bagIndex < lookForBags.length);

  const uniqueBags = lookForBags.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
  })

  const bagsInBags = (lookFor) => {
    const bagRule = allBagRules.find(rule => rule[0] === lookFor);
    if (bagRule.includes('no other bags.')) return 0;
    const bags = bagRule[1].split(', ');
    return bags.map(bag => {
      const numOfBags = parseInt(bag.charAt(0))
      return numOfBags + numOfBags * bagsInBags(bag.slice(2,bag.indexOf(' bag')))
    })
      .reduce((a,b) => a + b);
  }

  return <div>
    {inputTextArea}
    <p>There are {allBagRules.length} baggage rules</p>
    <p>There are <b>{uniqueBags.length - 1}</b> bags that can hold a shiny gold bag</p>
    <p>There are <b>{bagsInBags(lookForBags[0])}</b> bags inside my shiny gold bag</p>
    <br/>

  </div>
}