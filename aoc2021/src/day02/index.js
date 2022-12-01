import run from "aocrunner";
import { parseInputToArray } from "../utils/index.mjs";

const testData = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput);
  const coords = { horizontal: 0, depth: 0, aim: 0 };
  input.forEach((element) => {
    const [direction, distance] = element.split(" ");
    const parsedDistance = parseInt(distance);
    switch (direction) {
      case "forward":
        coords.horizontal += parsedDistance;
        break;
      case "up":
        coords.depth -= parsedDistance;
        break;
      case "down":
        coords.depth += parsedDistance;
        break;
    }
  });

  const product = coords.horizontal * coords.depth;

  return product;
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput);
  const coords = { horizontal: 0, depth: 0, aim: 0 };
  input.forEach((element) => {
    const [direction, distance] = element.split(" ");
    const parsedDistance = parseInt(distance);
    switch (direction) {
      case "forward":
        coords.horizontal += parsedDistance;
        coords.depth += parsedDistance * coords.aim;
        break;
      case "up":
        coords.aim -= parsedDistance;
        break;
      case "down":
        coords.aim += parsedDistance;
        break;
    }
  });

  const product = coords.horizontal * coords.depth;

  return product;
};

run({
  part1: {
    tests: [{ input: testData, expected: 150 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 900 }],
    solution: part2,
  },
  trimTestInputs: true,
});
