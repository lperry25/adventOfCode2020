import React, { useState } from 'react';

const StartingRows = [0, 127];
const StartingColumns = [0, 7];

const lowerHalf = ([low, high]) => {
  return [low, low + Math.floor((high - low) / 2)];
};
const upperHalf = ([low, high]) => {
  return [low + Math.ceil((high - low) / 2), high];
};

const reducer = (range, direction) => {
  switch (direction) {
    case 'F':
    case 'L':
      return lowerHalf(range);
    case 'B':
    case 'R':
      return upperHalf(range);
    default:
      throw new Error(`Unexpected direction ${direction}`);
  }
}

export const getSeatIds = (binaries) => binaries.map(binary => {
  const row = binary.slice(0, 7).split('').reduce(reducer, StartingRows);
  const col = binary.slice(7, 11).split('').reduce(reducer, StartingColumns);
  return row[0] * 8 + col[0];
})

export function Day5() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Finding seat IDs</h1>
      <textarea id="day5-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  const formattedInput = input.split('\n');

  const seatIds = getSeatIds(formattedInput);
  const highestSeatId = Math.max(...seatIds);
  const sortedSeats = seatIds.sort();
  const mySeat = sortedSeats.find((id, index) => index > 1 && (id - sortedSeats[index - 1]) === 2) - 1;

  return (
    <div>
      {inputTextArea}
      <p>There are {formattedInput.length} seats</p>
      <p>The highest seat ID is <b>{highestSeatId}</b></p>
      <p>Your seat ID is <b>{mySeat}</b></p>
    </div>
  );
}