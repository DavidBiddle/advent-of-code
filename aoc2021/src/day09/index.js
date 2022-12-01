import run from "aocrunner";
import {
  parseInputToArray,
  splitByEmptyString,
  parseIntDecimal,
  sumArray,
  multiplyArray,
  compareNumbers,
  isOutOfBounds,
  getNeighbourCoords,
} from "../utils/index.mjs";

const getRiskFactor = (point) => point + 1;

const findNeighbours = (array, coords) => {
  const neighbours = coords
    .filter((coord) => !isOutOfBounds(array, coord.x, coord.y))
    .map((coord) => array[coord.y][coord.x]);

  return neighbours;
};

const isLowPoint = (element, indexX, indexY, array) => {
  const neighbourCoords = getNeighbourCoords(indexX, indexY);
  return element < Math.min(...findNeighbours(array, neighbourCoords));
};

const getLowPoints = (map) => {
  const lowPoints = map.map((line, indexY) =>
    line.filter((point, indexX) => isLowPoint(point, indexX, indexY, map)),
  );
  return lowPoints;
};

const getMapFromInput = (rawInput) =>
  parseInputToArray(rawInput).map((line) =>
    splitByEmptyString(line).map(parseIntDecimal),
  );

const traverseGroups = (x, y, grid) => {
  if (
    isOutOfBounds(grid, x, y) ||
    grid[y][x].value == 9 ||
    grid[y][x].visited == true
  ) {
    return 0;
  }

  let sum = 1;
  grid[y][x].visited = true;

  sum += sumArray(
    getNeighbourCoords(x, y, grid).map((neighbour) =>
      traverseGroups(neighbour.x, neighbour.y, grid),
    ),
  );

  return sum;
};

const getGroups = (grid) => {
  const gridWithVisitedInformation = grid.map((line) =>
    line.map((point) => ({ value: point, visited: false })),
  );

  const groups = gridWithVisitedInformation
    .map((line, indexY) =>
      line.map((point, indexX) =>
        traverseGroups(indexX, indexY, gridWithVisitedInformation),
      ),
    )
    .flat()
    .filter((groupSize) => groupSize > 0)
    .sort(compareNumbers);

  return groups;
};

const part1 = (rawInput) => {
  const map = getMapFromInput(rawInput);

  const lowPoints = getLowPoints(map).flat();

  const riskFactors = lowPoints.map(getRiskFactor);

  const totalRiskFactor = sumArray(riskFactors);

  return totalRiskFactor;
};

const part2 = (rawInput) => {
  const grid = getMapFromInput(rawInput);
  const largest3Groups = getGroups(grid)
    .reverse()
    .slice(0, 3);

  return multiplyArray(largest3Groups);
};

const testData = `
2199943210
3987894921
9856789892
8767896789
9899965678
`;

run({
  part1: {
    tests: [{ input: testData, expected: 15 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 1134 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
