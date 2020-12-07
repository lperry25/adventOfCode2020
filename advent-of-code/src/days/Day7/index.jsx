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
      const ruleSplit = rule.split(' bags contain ');
      const includesTheBag = ruleSplit[1].includes(lookForBags[bagIndex]);
      if (includesTheBag){
        lookForBags.push(ruleSplit[0]);
      }
      return !includesTheBag;
    })
    bagIndex ++;
  } while(bagIndex < lookForBags.length);

  const uniqueBags = lookForBags.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
  })

  const bagsInBags = (lookFor) => {
    const bagRule = allBagRules.find(rule => {
      const ruleSplit = rule.split(' bags contain ');
      return ruleSplit[0] == lookFor;
    });
    if (bagRule.includes('no other bags.')) return 0;
    const bags = bagRule.split(' bags contain ')[1].split(', ');
    return bags.map(bag => {
      const numberOfBags = bag.charAt(0);
      const bagType = bag.slice(2,bag.indexOf(' bag'));
      return parseInt(numberOfBags,10) + parseInt(numberOfBags,10) * bagsInBags(bagType);
    }).reduce((a,b) => a + b);
  }

  return <div>
    {inputTextArea}
    <p>There are {allBagRules.length} baggage rules</p>
    <p>There are <b>{uniqueBags.length - 1}</b> bags that can hold a shiny gold bag</p>
    <p>There are <b>{bagsInBags('shiny gold')}</b> bags inside my shiny gold bag</p>
    <br/>

  </div>
}