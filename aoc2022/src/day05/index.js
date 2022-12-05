import run from "aocrunner";
import { parseIntDecimal, transposeMatrix } from "../../../utils/index.mjs";

const parseInput = (rawInput) => {
  const [rawState, rawMoves] = rawInput.split("\n\n");
  const state = transposeMatrix(
    rawState
      .split("\n")
      .reverse()
      .map((line) => line.match(/(    |[A-Z])/g))
      .filter((line) => line !== null),
  ).map((line) => line.filter((item) => item !== "    "));
  const moves = rawMoves
    .split("\n")
    .map((move) => move.match(/\d+/g).map(parseIntDecimal));

  return [state, moves];
};

const getTopCrates = (column) => column[column.length - 1];

const part1 = (rawInput) => {
  const [state, moves] = parseInput(rawInput);

  moves.forEach(([quantity, startColumn, endColumn]) => {
    const startIndex = startColumn - 1;
    const endIndex = endColumn - 1;

    for (let i = 0; i < quantity; i++) {
      const crate = state[startIndex].pop();
      state[endIndex].push(crate);
    }
  });

  const topCrates = state.map(getTopCrates).join("");

  return topCrates;
};

const part2 = (rawInput) => {
  const [state, moves] = parseInput(rawInput);

  moves.forEach(([quantity, startColumn, endColumn]) => {
    const startIndex = startColumn - 1;
    const endIndex = endColumn - 1;
    const crates = state[startIndex].splice(
      state[startIndex].length - quantity,
      quantity,
    );
    state[endIndex] = state[endIndex].concat(crates);
  });
  const topCrates = state.map(getTopCrates).join("");

  return topCrates;
};

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
