import run from "aocrunner";
import { parseInputToArray } from "../utils/index.js";

const testData = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

const parseIntDecimal = (string) => parseInt(string, 10);
const parseIntBinary = (string) => parseInt(string, 2);

const epsilonReducer = (previous, current) => {
  const newValue = current.map(parseIntDecimal).map((element, index) => {
    return previous[index] + element;
  });
  return newValue;
};

const flipbits = (str) =>
  str
    .split("")
    .map((b) => (1 - b).toString())
    .join("");

const calculateGammaAndEpsilon = (input) => {
  const epsilonInitial = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const epsilonRaw = input.reduce(epsilonReducer, epsilonInitial);
  const gammaString = epsilonRaw
    .map((element) => (element > input.length / 2 ? 1 : 0))
    .join("");
  const epsilonString = flipbits(gammaString);

  return [gammaString, epsilonString];
};

const mostCommonBitAtIndex = (array, index) => {
  const resultsWith1in = array.filter((element) => element[index] === '1');
  const average = array.length / 2;

  if (resultsWith1in.length >= average) {
    return 1;
  } else {
    return 0;
  }
};

const leastCommonBitAtIndex = (array, index) => {
  return !mostCommonBitAtIndex(array, index);
};

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput).map((element) => element.split(""));
  const [gammaString, epsilonString] = calculateGammaAndEpsilon(input);

  const result = parseIntBinary(gammaString) * parseIntBinary(epsilonString);

  return result;
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput).map((element) => element.split(""));

  let oxygenRatings = input;
  for(let i = 0; oxygenRatings.length > 1; i++) {
    oxygenRatings = oxygenRatings.filter((element) => {
      return parseIntBinary(element[i]) == mostCommonBitAtIndex(oxygenRatings, i)
    });
  }
  const oxygenRating = parseIntBinary(oxygenRatings[0].join(""));

  let co2Ratings = input;
  for(let i = 0; co2Ratings.length > 1; i++) {
    co2Ratings = co2Ratings.filter((element) => {
      return parseIntBinary(element[i]) == leastCommonBitAtIndex(co2Ratings, i)
    });
  }
  const co2Rating = parseIntBinary(co2Ratings[0].join(""));
  const result = oxygenRating * co2Rating

  return result;
};

run({
  part1: {
    tests: [{ input: testData, expected: 198 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 230 }],
    solution: part2,
  },
  trimTestInputs: true,
});
