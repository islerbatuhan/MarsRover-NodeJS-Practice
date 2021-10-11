const prompt = require('prompt-sync')({ sigint: true });

const compass = {
  3: [1, 0], // E
  2: [0, 1], // N
  1: [-1, 0], // W
  0: [0, -1], // S
  border: null,
};

const directionConverter = {
  intToStr: {
    3: 'E',
    2: 'N',
    1: 'S',
    0: 'S',
  },
  strToInt: {
    E: 3,
    N: 2,
    W: 1,
    S: 0,
  },
};

// const roverData = {
//   currentPosition: [3, 3],
//   direction: 3,
// };

function coordinateSum(arr1, arr2) {
  return arr1.map((item, pos) => item + arr2[pos]);
}

function isOutOfBorder(nextPos, border) {
  if (nextPos[0] > border[0] || nextPos[1] > border[1]) {
    // console.error('at the border, cannot move!');
    return true;
  }
  return false;
}

function printRoverResult(roverList) {
  console.log('\nResult:\n');
  roverList.forEach((roverData) => {
    console.log(
      `${roverData.currentPosition[0]} ${roverData.currentPosition[1]} ${
        directionConverter.intToStr[roverData.direction]
      }`,
    );
  });
}

function roverMove(roverData) {
  [...roverData.moveSet].forEach((letter) => {
    roverData.direction =
      roverData.direction < 0
        ? roverData.direction + 4
        : roverData.direction % 4;
    switch (letter) {
      case 'L':
        roverData.direction -= 1;
        break;
      case 'R':
        roverData.direction += 1;
        break;
      case 'M': {
        const nextPos = coordinateSum(
          roverData.currentPosition,
          compass[roverData.direction],
        );
        roverData.currentPosition = !isOutOfBorder(nextPos, compass.border)
          ? (roverData.currentPosition = nextPos)
          : roverData.currentPosition;
        break;
      }
      default:
        console.error(`letter: ${letter}is not allowed!`);
        break;
    }
  });
  //   console.log('after:\n' + JSON.stringify(roverData, null) + '\n\n\n');
  return roverData;
}

let exit = false;
compass.border = prompt('What is the border: ').split(' ').map(Number);

const roverDataList = [];
const resultRoverList = [];

while (!exit) {
  const inputPos = prompt('Where is the position of the rover: ').split(' ');
  const inputDirections = prompt('What is the move set: ');
  if (isOutOfBorder(inputPos, compass.border)) {
    console.log(
      'Rover is out of border, please try again with different coordinates.',
    );
  } else {
    roverDataList.push({
      currentPosition: [parseInt(inputPos[0], 10), parseInt(inputPos[1], 10)],
      direction: directionConverter.strToInt[inputPos[2]],
      moveSet: inputDirections,
    });
  }
  exit =
    prompt(
      'Please write "exit" if you do not want to continue adding more rovers: ',
    ) === 'exit';
}

roverDataList.forEach((roverData) => {
  resultRoverList.push(roverMove(roverData));
});
printRoverResult(resultRoverList);
