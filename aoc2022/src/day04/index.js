import run from "aocrunner";
import { parseIntDecimal } from "../../../utils/index.mjs";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((e) => e.split(",").map((e2) => e2.split("-").map(parseIntDecimal)));

const sectionWhollyContainedInSection = (
  [lower1, upper1],
  [lower2, upper2],
) => {
  return lower1 <= lower2 && upper1 >= upper2;
};

const sectionContainsTheOther = ([section1, section2]) => {
  return (
    sectionWhollyContainedInSection(section1, section2) ||
    sectionWhollyContainedInSection(section2, section1)
  );
};

const sectionBoundsContainedInOtherSection = (
  [lower1, upper1],
  [lower2, upper2],
) => {
  return (
    (lower1 <= upper2 && lower1 >= lower2) ||
    (upper1 <= upper2 && upper1 >= lower2)
  );
};

const sectionsOverLap = ([section1, section2]) => {
  return (
    sectionBoundsContainedInOtherSection(section1, section2) ||
    sectionBoundsContainedInOtherSection(section2, section1)
  );
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.filter(sectionContainsTheOther).length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return input.filter(sectionsOverLap).length;
};

const testData = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
