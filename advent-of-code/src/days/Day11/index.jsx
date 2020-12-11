import React, { useState } from 'react';

export function Day11() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Adapter Array</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  let seatMap = input.split('\n').map(seatRow => seatRow.split(''));

  const exists = (i, j) => i ? i[j] : undefined;

  const closestChair = (map, x, y, adjustx, adjusty) => {
    const seat = exists(map[x], [y]);
    if (seat !== '.') return seat;
    return closestChair(map, x + adjustx, y + adjusty, adjustx, adjusty);
  }

  const adjacentSeats = (map, i, j, isPart1) => {
    if (isPart1) {
      return [
        exists(map[i - 1], j - 1), exists(map[i - 1], j), exists(map[i - 1], j + 1),
        exists(map[i], j - 1), exists(map[i], j + 1),
        exists(map[i + 1], j - 1), exists(map[i + 1], j), exists(map[i + 1], j + 1),
      ];
    }
    return [
      closestChair(map, i - 1, j - 1, -1, -1),
      closestChair(map, i - 1, j, -1, 0),
      closestChair(map, i - 1, j + 1, -1, 1),
      closestChair(map, i, j - 1, 0, -1),
      closestChair(map, i, j + 1, 0, 1),
      closestChair(map, i + 1, j - 1, 1, -1),
      closestChair(map, i + 1, j, 1, 0),
      closestChair(map, i + 1, j + 1, 1, 1),
    ];
  }

  const countOccupied = (map) => map.filter(seat => seat === '#').length;

  const setSeatValue = (seat, i, j, map, isPart1) => {
    switch (seat) {
      case '.':
        return '.';
      case '#':
        if (countOccupied(adjacentSeats(map, i, j, isPart1)) >= (isPart1 ? 4 : 5)) return 'L';
        return '#';
      case 'L':
        if (adjacentSeats(map, i, j, isPart1).every(chair => chair !== '#' || undefined)) return '#';
        return 'L';
      default:
        throw Error('Unexpected value in seat map');
    }
  }
  const prepareMap = (current, isPart1) => current.map((row, r) => row.map((seat, s) => setSeatValue(seat, r, s, current, isPart1)))
  const loopSeatMap = (startingMap, isPart1) => {
    let seatMap2 = [];
    let loopIndex = 0;
    do {
      loopIndex++;
      if (loopIndex % 2) {
        seatMap2 = prepareMap(startingMap, isPart1);
      } else {
        startingMap = prepareMap(seatMap2, isPart1);
      }
    } while (!startingMap.every((row, r) => row.every((seat, s) => seat === seatMap2[r][s])));
    return startingMap;
  }

  const countAllOccupied = (finalState) => finalState.map(row => countOccupied(row)).reduce((a, b) => a + b);


  const occupiedSeatsPart1 = countAllOccupied(loopSeatMap(seatMap, true));
  const occupiedSeatsPart2 = countAllOccupied(loopSeatMap(seatMap, false));


  return (<div>
    {inputTextArea}
    <p>There are {seatMap.length} rows and {seatMap[0].length} columns of seats</p>
    <p>Part 1: There are {occupiedSeatsPart1} occupied seats when it stabalizes</p>
    <p>Part 2: There are {occupiedSeatsPart2} occupied seats when it stabalizes</p>
    <br />

  </div>)
}