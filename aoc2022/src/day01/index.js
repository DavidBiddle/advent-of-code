import run from "aocrunner";
import {
  parseIntDecimal,
  sumArray,
  compareNumbers,
} from "../../../utils/index.mjs";

const parseInput = (rawInput) => rawInput;

const convertToIndividualElves = (values) =>
  values
    .split("\n\n")
    .map((e) => e.split("\n").map(parseIntDecimal))
    .map(sumArray);

const getTop3 = (values) =>
  values
    .sort(compareNumbers)
    .reverse()
    .slice(0, 3);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = convertToIndividualElves(input);

  return Math.max(...elves);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = convertToIndividualElves(input);
  const top3Elves = getTop3(elves);

  return sumArray(top3Elves);
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
  onlyTests: true,
});
