import run from "aocrunner";
import {
  parseInputToArray,
  getUniqueValues,
  getOccurences,
} from "../utils/index.js";

const isBigCave = (string) => string == string.toUpperCase();

const isSmallCave = (cave) => !isBigCave(cave);

const isValidCave = (
  cave,
  moves,
  allowMultipleVisitsToSmallCaves,
  specialCave,
) =>
  (moves.indexOf(cave) == -1 ||
    (allowMultipleVisitsToSmallCaves &&
      cave == specialCave &&
      getOccurences(moves)[cave] < 2) ||
    isBigCave(cave)) &&
  cave !== "start";

const createMap = (array) => {
  const caves = {};

  getUniqueValues(array.flat()).forEach((cave) => {
    caves[cave] = {
      connections: [],
    };
  });

  array.forEach((link) => {
    caves[link[0]].connections.push(link[1]);
    caves[link[1]].connections.push(link[0]);
  });

  return caves;
};

const getPathsForMap = (
  map,
  allowMultipleVisitsToSmallCaves = false,
  specialCave,
) => {
  let paths = [];
  let stack = [["start"]];

  while (stack.length) {
    const moves = stack.pop();
    const currentCave = map[moves[moves.length - 1]];
    for (let connection of currentCave.connections) {
      if (connection == "end") {
        const path = [...moves, "end"].join(",");
        paths.push(path);
      } else if (
        isValidCave(
          connection,
          moves,
          allowMultipleVisitsToSmallCaves,
          specialCave,
        )
      ) {
        stack.push([...moves, connection]);
      }
    }
  }

  return paths;
};

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput).map((line) => line.split("-"));
  const map = createMap(input);
  const paths = getPathsForMap(map);

  return paths.length;
};

const part2 = (rawInput) => {
  let paths = [];
  const input = parseInputToArray(rawInput).map((line) => line.split("-"));
  const map = createMap(input);
  const smallCaves = Object.keys(map).filter(
    (key) => ["start", "end"].indexOf(key) === -1 && isSmallCave(key),
  );
  smallCaves.forEach((smallCave) => {
    paths.push(...getPathsForMap(map, true, smallCave));
  });

  return new Set(paths).size;
};

const testData = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const testData2 = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const testData3 = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

run({
  part1: {
    tests: [
      { input: testData, expected: 10 },
      { input: testData2, expected: 19 },
      { input: testData3, expected: 226 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: testData, expected: 36 },
      { input: testData2, expected: 103 },
      { input: testData3, expected: 3509 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
