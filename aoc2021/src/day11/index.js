import run from "aocrunner";
import {
  parseInputToArray,
  splitByEmptyString,
  parseIntDecimal,
  isOutOfBounds,
  getNeighbourCoordsIncludingDiagonals,
} from "../utils/index.mjs";

const processInput = (rawInput) =>
  parseInputToArray(rawInput).map((line) =>
    splitByEmptyString(line).map(parseIntDecimal),
  );

const neighbourShouldChange = (array, neighbour) =>
  !isOutOfBounds(array, neighbour.x, neighbour.y) &&
  array[neighbour.y][neighbour.x] !== 10;

const flashOctopus = (array, x, y) => {
  let newArray = array;
  getNeighbourCoordsIncludingDiagonals(x, y).forEach((neighbour) => {
    if (neighbourShouldChange(newArray, neighbour))
      newArray[neighbour.y][neighbour.x] += 1;
  });
  newArray[y][x] = 11;

  return newArray;
};

const flashArray = (array) => {
  let newArray = array;
  let arrayHasTens = array.flat().indexOf(10) !== -1;

  while (arrayHasTens) {
    newArray.forEach((line, y) => {
      const x = line.indexOf(10);
      if (x !== -1) newArray = flashOctopus(newArray, x, y);
    });
    arrayHasTens = array.flat().indexOf(10) !== -1;
  }

  return newArray;
};

const step = (octupi) => {
  const incrementedArray = octupi.map((row) =>
    row.map((octopus) => octopus + 1),
  );

  const flashedArray = flashArray(incrementedArray);

  const flashes = flashedArray.flat().filter((x) => x >= 10).length;

  const remove10s = flashedArray.map((row) =>
    row.map((octopus) => (octopus >= 10 ? 0 : octopus)),
  );
  return { array: remove10s, flashes };
};

const calculateStateAfterNSteps = (array, n) => {
  let newArray = array;
  let flashes = 0;
  for (let i = 0; i < n; i++) {
    const stepData = step(newArray);
    newArray = stepData.array;
    flashes += stepData.flashes;
  }
  return { array, flashes };
};

const part1 = (rawInput) => {
  const input = processInput(rawInput);

  const step100 = calculateStateAfterNSteps(input, 100).flashes;

  return step100;
};

const part2 = (rawInput) => {
  const input = processInput(rawInput);

  const numberOfOctupi = input.flat().length;

  let numberOfFlashes = 0;
  let stepsCompleted = 0;
  let newArray = input;

  while (numberOfFlashes < numberOfOctupi) {
    const stepData = step(newArray);
    newArray = stepData.array;
    stepsCompleted++;
    numberOfFlashes = stepData.flashes;
  }

  return stepsCompleted;
};

const testData = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

run({
  part1: {
    tests: [{ input: testData, expected: 1656 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 195 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
