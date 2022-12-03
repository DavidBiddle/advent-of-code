import run from "aocrunner";
import { sumArray } from "../../../utils/index.mjs";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((e) => e.split(" ").map(convertLetterToShape));

const calculateRoundPoints = (a, b) => {
  let outcome;
  if ((a == 1 && b == 2) || (a == 2 && b == 3) || (a == 3 && b == 1)) {
    outcome = 3;
  } else if (a == b) {
    outcome = 2;
  } else {
    outcome = 1;
  }
  return calculateOutcomePoints(outcome);
};

const calculateOutcomePoints = (outcome) => {
  return 3 * (outcome - 1);
};

const convertLetterToShape = (letter) => {
  switch (letter) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
  }
};

const convertOutcomeToShape = (opponentShape, outcome) => {
  return ((opponentShape + outcome) % 3) + 1;
};

const calculateTotalPointsPart1 = ([a, b]) => {
  return calculateRoundPoints(a, b) + b;
};

const calculateTotalPointsPart2 = ([a, b]) => {
  return calculateOutcomePoints(b) + convertOutcomeToShape(a, b);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return sumArray(input.map(calculateTotalPointsPart1));
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return sumArray(input.map(calculateTotalPointsPart2));
};

const testInput = `A Y
B X
C Z`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
