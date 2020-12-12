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

  // N, E, S, W
  const possibleDir = ['N', 'E', 'S', 'W'];

  const getDirIndex = (startingPos, val, plus) => {
    const currentDirIndex = possibleDir.findIndex(dir => dir === startingPos);
    const rotations = val / 90;
    if (plus) {
      console.log(currentDirIndex + rotations)
      return currentDirIndex + rotations < 4 ? currentDirIndex + rotations : currentDirIndex + rotations - 4;
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
        forwardDir = possibleDir[getDirIndex(forwardDir, val, true)];
        return coor;
      case 'L':
        forwardDir = possibleDir[getDirIndex(forwardDir, val)];
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
  const manhattanDistance = coor[0] + coor[1];

  // part 2
  console.log('start part 2');
  let WP = [-1, 10];
  let coor2 = [0, 0];

  const moveForward = (startPos, val, multiplier) => {
    console.log('move forward', val, multiplier);
    return startPos + val * multiplier;
  }
  const rotateWp = (currentWp, rotation, isClockwise) => {
    if (isClockwise){
  /*  if ((isClockwise && currentWp[0] * currentWp[1] < 0)
      || (!isClockwise && currentWp[0] * currentWp[1] > 0)) {*/
      console.log('clockwise', rotation);
      if (rotation === 90) return [currentWp[1], currentWp[0] * -1];
      if (rotation === 180) return [currentWp[0] * -1, currentWp[1] * -1];
      return [currentWp[1] * -1, currentWp[0]];
    }
    console.log('counter clockwise', rotation);

    if (rotation === 90) return [currentWp[1] * -1, currentWp[0]];
    if (rotation === 180) return [currentWp[0] * -1, currentWp[1] * -1];
    return [currentWp[1], currentWp[0] * -1];

  }
  const setWayPoints = (dir, val) => {
    switch (dir) {
      case 'E':
        WP = [WP[0], WP[1] + val];
        break;
      case 'W':
        WP = [WP[0], WP[1] - val];
        break;
      case 'S':
        WP = [WP[0] + val, WP[1]]
        break;
      case 'N':
        WP = [WP[0] - val, WP[1]];
        break;
      case 'F':
        coor2 = [moveForward(coor2[0], WP[0], val), moveForward(coor2[1], WP[1], val)]
        break;
      case 'R':
        WP = rotateWp(WP, val, true);
        break;
      case 'L':
        WP = rotateWp(WP, val);
        break;
      default:
        break;
    }
    return null;
  }
  for (let i = 0; i < nav.length; i++) {
    const dir = nav[i].charAt(0);
    const val = parseInt(nav[i].slice(1), 10);
    console.log('start at', coor2, 'move', dir, val, 'WP', WP);
    setWayPoints(dir, val, coor2);
    console.log('end of loop', coor2, WP);
  }

  console.log(coor2);
  const manhattanDistance2 = coor2[0] + coor2[1];





  return (<div>
    {inputTextArea}
    <p>There are {nav.length} directions</p>
    <p>Part 1: The manhattanDistance is <b>{manhattanDistance}</b></p>
    <p>Part 2: The manhattanDistance is <b>{manhattanDistance2}</b></p>
    <br />

  </div>)
}