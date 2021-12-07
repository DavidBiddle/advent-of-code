import run from "aocrunner";
import { parseInputToArray } from "../utils/index.js";

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput);

  return input;
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput);

  return input;
};

const testData = ``;

run({
  part1: {
    tests: [{ input: testData, expected: 0 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 0 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
