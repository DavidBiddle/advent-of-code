import run from "aocrunner";
import { slidingTotal, arrayCompare, parseInputToArray } from "../utils/index.js";

const testData = `
199
200
208
210
200
207
240
269
260
263
`;

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput);
  const results = input.filter(arrayCompare);

  return results.length;
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput);
  const results = input.map(slidingTotal).filter(arrayCompare);

  return results.length;
};

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
