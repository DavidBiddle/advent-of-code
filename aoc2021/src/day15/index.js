import run from "aocrunner";
import {
  parseInputToArray,
  parseIntDecimal,
  getNeighbourCoords,
  isOutOfBounds,
  setContains,
} from "../utils/index.mjs";

const createGraph = (rawInput) => {
  const input = parseInputToArray(rawInput).map((line) =>
    line.split("").map(parseIntDecimal),
  );

  return input;
};

const calculatePath = (grid, initialPosition = { x: 0, y: 0 }) => {
  const target = { x: grid.length - 1, y: grid.length - 1 };
  const queue = [{ position: initialPosition, risk: 0 }];
  const visited = new Set();

  while (queue.length) {
    const queueItem = queue.shift();
    const { x, y } = queueItem.position;
    const { risk: risk } = queueItem;

    if (y === target.y && x === target.x) return risk;

    const neighbourCoords = getNeighbourCoords(x, y);

    neighbourCoords
      .filter(({ x, y }) => !isOutOfBounds(grid, x, y))
      .filter((pos) => !setContains(visited, pos))
      .forEach((pos) => {
        const riskOfEntry = grid[pos.y][pos.x];

        visited.add(JSON.stringify(pos));
        queue.push({ position: pos, risk: risk + riskOfEntry });
      });
    queue.sort((a, b) => a.risk - b.risk);
  }
};

const part1 = (rawInput) => {
  const graph = createGraph(rawInput);

  const path = calculatePath(graph);

  return path;
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput);

  // return input;
};

const testData = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`;

run({
  part1: {
    tests: [{ input: testData, expected: 40 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 315 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
