import run from "aocrunner";
import {
  parseInputToArray,
  splitByComma,
  parseIntDecimal,
  getUniqueValues,
} from "../utils/index.js";

const createGrid = (dots) => {
  const grid = [];

  dots.forEach((dot) => {
    if (!grid[dot.y]) {
      grid[dot.y] = [];
    }
    grid[dot.y][dot.x] = 1;
  });

  const newGrid = [];

  const lineLengths = grid.map((line) => line.length).flat();
  const maxLineLength = Math.max(...lineLengths);

  for (let y = 0; y < grid.length; y++) {
    newGrid[y] = [];
    for (let x = 0; x < maxLineLength; x++) {
      newGrid[y][x] = grid[y]?.[x] ? "#" : ".";
    }
  }

  return newGrid;
};

const processInput = (rawInput) => {
  const [dotsRaw, foldsRaw] = rawInput.split(/\n\n/);
  const dots = parseInputToArray(dotsRaw)
    .map(splitByComma)
    .map((dot) => ({ x: parseIntDecimal(dot[0]), y: parseIntDecimal(dot[1]) }));
  const folds = parseInputToArray(foldsRaw).map((fold) => {
    const match = fold.match(/fold along (x|y)=([0-9]+)$/);
    return { axis: match[1], value: parseIntDecimal(match[2]) };
  });

  return { dots, folds };
};

const foldGrid = (dots, fold) => {
  const newDots = dots.map((dot) => {
    let x, y;
    if (fold.axis === "x") {
      y = dot.y;
      if (dot.x < fold.value) {
        x = dot.x;
      } else {
        x = fold.value - (dot.x - fold.value);
      }
    }
    if (fold.axis === "y") {
      x = dot.x;
      if (dot.y < fold.value) {
        y = dot.y;
      } else {
        y = fold.value - (dot.y - fold.value);
      }
    }
    return { x, y };
  });

  return newDots;
};

const performFolds = (dots, folds) => {
  let newDots = dots;
  for (let i = 0; i < folds.length; i++) {
    newDots = foldGrid(newDots, folds[i]);
  }
  return getUniqueValues(newDots);
};

const part1 = (rawInput) => {
  const { dots, folds } = processInput(rawInput);
  const folded = performFolds(dots, folds.slice(0, 1));
  const numberOfUniqueDots = folded.length;

  return numberOfUniqueDots;
};

const part2 = (rawInput) => {
  const { dots, folds } = processInput(rawInput);
  const folded = performFolds(dots, folds);
  const grid = createGrid(folded)
    .map((line) => line.join(""))
    .join("\n");

  // You have to read the letters from the console output, sorry. Might try and add something for this later.
  return grid;
};

const testData = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

run({
  part1: {
    tests: [{ input: testData, expected: 17 }],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: "#####\n#...#\n#...#\n#...#\n#####",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
