import React, {useState} from 'react';

export function Day10() {
  const [input, setInput] = useState('');
  const [preambleLength, setPreambleLength] = useState(25);

  const inputTextArea =
    <>
      <h1>Adapter Array</h1>
      <textarea id="day4-input"
                value={input}
                placeholder="Add your input file"
                onChange={({target}) => setInput(target.value)}/>
    </>;

  if (input === '') return inputTextArea;
  let adapaters = input.split('\n').map(num => parseInt(num))
  const sortedAdapters = adapaters.sort((a, b) => (a - b));
  const finalJoltage = Math.max(...sortedAdapters) + 3;
  console.log(sortedAdapters);

  //part 1
  let sum1Diff = 0;
  let sum3Diff = 0;
  if (sortedAdapters[0] === 1) sum1Diff++;
  else if (sortedAdapters[0] === 3) sum1Diff++;
  for (let i = 1; i < sortedAdapters.length; i++) {
    const diff = sortedAdapters[i] - sortedAdapters[i - 1];
    if (diff === 1) sum1Diff += 1;
    if (diff === 3) sum3Diff += 1;
  }
  //add one to the 3 diff to account for the final joltage
  const productOfDiffs = sum1Diff * (sum3Diff + 1);

  //part 2 - first solution, doesn't scale but works for small sets
  /*const secondLastJoltage = sortedAdapters[sortedAdapters.length -1];
  const checkJoltageTree = (x, index) => {
   if (!sortedAdapters.slice(index).includes(x) && x !==0) return 0;
    if (x === secondLastJoltage) return 1;
    const nextIndex = index + 1;
    return checkJoltageTree(x+1, nextIndex) + checkJoltageTree(x+2, nextIndex) + checkJoltageTree(x+3, nextIndex);
  }
  const possibleTrees = checkJoltageTree(1, 0) + checkJoltageTree(2, 0) + checkJoltageTree(3, 0);*/

  // part 2 - math solution
  const adapterDifferences = sortedAdapters.map((val, i) => i === 0 ? 1 : val - sortedAdapters[i - 1]);
  let repeatingOnes = [];
  let countIndex = -1;
  for (let i = 0; i < adapterDifferences.length; i++) {
    if (adapterDifferences[i] === 1) {
      if (adapterDifferences[i - 1] !== 1) {
        repeatingOnes = [...repeatingOnes, 1];
        countIndex++;
      } else {
        repeatingOnes[countIndex] += 1;
      }
    }
  }
  const manipulateNum = repeatingOnes.filter(num => num > 1).map(n => {
    if (n === 2) return 2;
    if (n === 3) return 4;
    if (n === 4) return 7;
  });
  const finalAnswer = manipulateNum.reduce((a, b) => a * b);


  return (<div>
    {inputTextArea}
    <p>There are {sortedAdapters.length} adapters in the bag</p>
    <p>The final joltage is {finalJoltage}</p>
    <p>There are {sum1Diff} difference of 1-jolt and {sum3Diff + 1} difference of 3-jolt</p>
    <p>The number of 1-jolt differences multiplied by the number of 3-jolt differences is <b>{productOfDiffs}</b></p>
    <p>There are <b>{finalAnswer}</b> possible combinations of adapters</p>
    <br/>

  </div>)
}