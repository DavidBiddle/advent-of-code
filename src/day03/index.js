import run from "aocrunner";
import { parseInputToArray, parseIntDecimal } from "../utils/index.js";

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
  const resultsWith1in = array.filter((element) => element[index] === "1");
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
  let co2Ratings = input;
  const length = input[0].length;

  for (let i = 0; i < length; i++) {
    const mostCommonBit = mostCommonBitAtIndex(oxygenRatings, i);
    const leastCommonBit = leastCommonBitAtIndex(co2Ratings, i);
    if (oxygenRatings.length > 1) {
      oxygenRatings = oxygenRatings.filter((element) => {
        return parseIntBinary(element[i]) == mostCommonBit;
      });
    }
    if (co2Ratings.length > 1) {
      co2Ratings = co2Ratings.filter((element) => {
        return parseIntBinary(element[i]) == leastCommonBit;
      });
    }
  }
  const oxygenRating = parseIntBinary(oxygenRatings[0].join(""));

  const co2Rating = parseIntBinary(co2Ratings[0].join(""));
  const result = oxygenRating * co2Rating;

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
