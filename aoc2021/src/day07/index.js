import run from "aocrunner";
import { parseIntDecimal, compareNumbers, range } from "../utils/index.mjs";

const testData = `16,1,2,0,4,2,7,1,2,14`;

const processInput = (rawInput) =>
  rawInput
    .split(",")
    .map(parseIntDecimal)
    .sort(compareNumbers);

const linearFuelAdjustment = (distance) => {
  return distance;
};
const triangularFuelAdjustment = (distance) => {
  return 0.5 * distance * (distance + 1);
};

const totalFuelUsage = (array, targetValue, adjustment) => {
  const reducer = (accumulator, value) => {
    return accumulator + adjustment(Math.abs(targetValue - value));
  };

  const totalDistance = array.reduce(reducer, 0);

  return totalDistance;
};

const binarySearchArray = (array, functionToMinimize) => {
  const minimum = array[0];
  const maximum = array[array.length - 1];
  const testIndex = Math.floor(array.length / 2);

  const sign = Math.sign(
    functionToMinimize(minimum) - functionToMinimize(maximum),
  );

  switch (sign) {
    case 0:
      return functionToMinimize(maximum);
    case -1:
      return binarySearchArray(array.slice(0, testIndex), functionToMinimize);
    default:
      return binarySearchArray(array.slice(testIndex), functionToMinimize);
  }
};

const calculateMinimumFuelUsage = (input, comparison) => {
  const minimum = input[0];
  const maximum = input[input.length - 1];
  const integers = range(minimum, maximum, 1);

  const fuelUseFunction = (targetValue) =>
    totalFuelUsage(input, targetValue, comparison);

  return binarySearchArray(integers, fuelUseFunction);
};

const part1 = (rawInput) => {
  const crabs = processInput(rawInput);

  return calculateMinimumFuelUsage(crabs, linearFuelAdjustment);
};

const part2 = (rawInput) => {
  const crabs = processInput(rawInput);

  return calculateMinimumFuelUsage(crabs, triangularFuelAdjustment);
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
