import React, { useState } from 'react';

export function Day12() {
  const [input, setInput] = useState('');

  const inputTextArea =
    <>
      <h1>Ferry Navigation</h1>
      <textarea id="day4-input"
        value={input}
        placeholder="Add your input file"
        onChange={({ target }) => setInput(target.value)} />
    </>;

  if (input === '') return inputTextArea;
  let nav = input.split('\n');

  console.log(nav);

  const manhattanSum = (i, p, q) => (p[i] - q[i])

  // N, E, S, W

  const possibleDir = ['N', 'E', 'S', 'W'];
  const getDirIndex = (val, plus) => {
    const currentDirIndex = possibleDir.findIndex(dir => dir === forwardDir);
    const rotations = val / 90;
    if (plus){
      console.log(currentDirIndex + rotations)
      return currentDirIndex + rotations < 4 ? currentDirIndex + rotations : currentDirIndex + rotations -4;
    } 
    console.log(currentDirIndex - rotations);
    return currentDirIndex - rotations > -1 ? currentDirIndex - rotations : currentDirIndex - rotations + 4;
  }


  // part 1
  let forwardDir = 'E';
  const setCoordinates = (dir, val, coor) => {
    switch (dir) {
      case 'E':
        return [coor[0], coor[1] + val]
      case 'W':
        return coor = [coor[0], coor[1] - val];
      case 'S':
        return [coor[0] + val, coor[1]]
      case 'N':
        return coor = [coor[0] - val, coor[1]];
      case 'F':
        return setCoordinates(forwardDir, val, coor);
      case 'R':
        console.log('dir', val, forwardDir, possibleDir[getDirIndex(val, true)]);
        forwardDir = possibleDir[getDirIndex(val, true)];
        return coor;
      case 'L':
        console.log('dir', val, forwardDir, possibleDir[getDirIndex(val, true)]);
        forwardDir = possibleDir[getDirIndex(val)];
        return coor;
      default:
        return coor;


    }
  }

  let coor = [0, 0];

  for (let i = 0; i < nav.length; i++) {
    const dir = nav[i].charAt(0);
    const val = parseInt(nav[i].slice(1), 10);
    coor = setCoordinates(dir, val, coor);
  }

  console.log(coor);
  const manhattanDistance = coor[0] + coor[1];

 /* // part 2
  let wPDir = ['N','E'];
  let WP = [1, 10];
  let coor2 = [0, 0];
  const setWayPoints = (dir, val, coordinates) => {
    switch (dir) {
      case 'E':
        return [WP[0], WP[1] + val]
      case 'W':
        return [WP[0], WP[1] - val];
      case 'S':
        return [WP[0] + val, WP[1]]
      case 'N':
        return [WP[0] - val, WP[1]];
      case 'F':

        return setWayPoints(wPDir, val, coordinates);
      case 'R':
        console.log('dir', val, forwardDir, possibleDir[getDirIndex(val, true)]);
        forwardDir = possibleDir[getDirIndex(val, true)];
        return coordinates;
      case 'L':
        console.log('dir', val, forwardDir, possibleDir[getDirIndex(val, true)]);
        forwardDir = possibleDir[getDirIndex(val)];
        return coordinates;
      default:
        return coordinates;


    }
  }
  for (let i = 0; i < nav.length; i++) {
    const dir = nav[i].charAt(0);
    const val = parseInt(nav[i].slice(1), 10);
    coor2 = setCoordinates(dir, val, coor2);
  }

  console.log(coor2);
  const manhattanDistance2 = coor2[0] + coor2[1];

*/



  return (<div>
    {inputTextArea}
    <p>There are {nav.length} directions</p>
    <p>Part 1: The manhattanDistance is <b>{manhattanDistance}</b></p>
    {/*<p>Part 2: There are {occupiedSeatsPart2} occupied seats when it stabalizes</p>*/}
    <br />

  </div>)
}