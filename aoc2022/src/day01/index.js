import run from "aocrunner";
import {
  parseIntDecimal,
  sumArray,
  compareNumbers,
  add,
} from "../../../utils/index.mjs";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = input
    .split("\n\n")
    .map((e) => e.split("\n").map(parseIntDecimal))
    .map(sumArray);

  return Math.max(...elves);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = input
    .split("\n\n")
    .map((e) => e.split("\n").map(parseIntDecimal))
    .map(sumArray)
    .sort(compareNumbers)
    .reverse()
    .slice(0, 3);

  return elves.reduce(add, 0);
};

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
