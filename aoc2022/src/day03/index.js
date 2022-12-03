import run from "aocrunner";
import { sumArray } from "../../../utils/index.mjs";

const parseInput = (rawInput) => rawInput.split("\n");

const cutStringInHalf = (string) => {
  const halfWayIndex = Math.floor(string.length / 2);
  return [
    new Set(string.slice(0, halfWayIndex)),
    new Set(string.slice(halfWayIndex, string.length)),
  ];
};

const unionOfSets = (setA, setB) =>
  new Set([...setA].filter((element) => setB.has(element)));

const getItemInBothCompartments = ([compartmentA, compartmentB]) =>
  [...unionOfSets(compartmentA, compartmentB)][0];

const getItemInAll3Elves = ([elf1, elf2, elf3]) =>
  [...unionOfSets(unionOfSets(elf1, elf2), elf3)][0];

const getPriorityCode = (letter) => {
  const charcode = letter.charCodeAt(0) - 96;
  if (charcode <= 0) return charcode + 58;
  else return charcode;
};

const getChunkedArrays = (array) => {
  let chunkedArrays = [];

  for (let i = 0; i < array.length; i += 3) {
    const chunk = array.slice(i, i + 3);
    chunkedArrays.push(chunk.map((elf) => new Set(elf)));
  }

  return chunkedArrays;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .map(cutStringInHalf)
    .map(getItemInBothCompartments)
    .map(getPriorityCode);

  return sumArray(input);
};

const part2 = (rawInput) => {
  const input = getChunkedArrays(parseInput(rawInput))
    .map(getItemInAll3Elves)
    .map(getPriorityCode);

  return sumArray(input);
};

const testData = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
