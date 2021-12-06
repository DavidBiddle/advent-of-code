import run from "aocrunner";
import { parseIntDecimal, sumArray } from "../utils/index.js";

const testData = `3,4,3,1,2`;

const processInput = (rawInput) => {
  return rawInput.split(",").map(parseIntDecimal);
};

const decrement = (array) => {
  const zeroes = array.shift();
  array[6] += zeroes;
  array[8] = zeroes;

  return array;
};

const populateState = (input) => {
  const array = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  input.forEach((item) => {
    array[item]++;
  });

  return array;
};

const calculateStateAfterNDays = (state, days) => {
  return days === 0
    ? state
    : calculateStateAfterNDays(decrement(state), days - 1);
};

const calculatePopulationAfterNDays = (state, days) => {
  const stateAfterNDays = calculateStateAfterNDays(state, days);

  return sumArray(stateAfterNDays);
};

const part1 = (rawInput) => {
  const input = processInput(rawInput);
  const initialState = populateState(input);
  const population = calculatePopulationAfterNDays(initialState, 80);

  return population;
};

const part2 = (rawInput) => {
  const input = processInput(rawInput);
  const initialState = populateState(input);
  const population = calculatePopulationAfterNDays(initialState, 256);

  return population;
};

run({
  part1: {
    tests: [{ input: testData, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
