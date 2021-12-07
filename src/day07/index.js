import run from "aocrunner";
import { parseIntDecimal, compareNumbers, range } from "../utils/index.js";

const testData = `16,1,2,0,4,2,7,1,2,14`;

const processInput = (rawInput) =>
  rawInput.split(",").map(parseIntDecimal).sort(compareNumbers);

const fuelCalculationNonLinear = (distance) => {
  return 0.5 * distance * (distance + 1);
};

const nonLinearComparison = (accumulator, value, targetValue) => {
  return accumulator + fuelCalculationNonLinear(Math.abs(targetValue - value));
};

const linearComparison = (accumulator, value, targetValue) =>
  accumulator + Math.abs(targetValue - value);

const fuelUsed = (array, targetValue, comparison) => {
  const totalDistance = array.reduce(
    (accumulator, value) => comparison(accumulator, value, targetValue),
    0,
  );

  return totalDistance;
};

const binarySearchArray = (array, functionToMinimize) => {
  const testIndex = Math.floor(array.length / 2);
  const sign = Math.sign(
    functionToMinimize(array[0]) - functionToMinimize(array[array.length - 1]),
  );
  if (sign === 0) {
    return functionToMinimize(array[0]);
  } else if (sign === -1) {
    return binarySearchArray(array.slice(0, testIndex), functionToMinimize);
  } else {
    return binarySearchArray(array.slice(testIndex), functionToMinimize);
  }
};

const part1 = (rawInput) => {
  const input = processInput(rawInput);

  const fuelUseFunction = (targetValue) =>
    fuelUsed(input, targetValue, linearComparison);

  return binarySearchArray(input, fuelUseFunction);
};

const part2 = (rawInput) => {
  const input = processInput(rawInput);
  const integers = range(input[0], input[input.length - 1], 1);

  const fuelUseFunction = (targetValue) =>
    fuelUsed(input, targetValue, nonLinearComparison);

  return binarySearchArray(integers, fuelUseFunction);
};

run({
  part1: {
    tests: [{ input: testData, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
