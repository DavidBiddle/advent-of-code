import run from "aocrunner";
import { parseInputToArray, parseIntDecimal } from "../utils/index.js";

const testData = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

const processInput = (rawInput) => {
  return parseInputToArray(rawInput).map((line) =>
    line.split(" -> ").map((coordinate) => {
      const [x, y] = coordinate.split(",").map(parseIntDecimal);
      return { x, y };
    }),
  );
};

const isDiagonal = (element) =>
  element[0].x !== element[1].x && element[0].y !== element[1].y;

const isNotDiagonal = (element) => !isDiagonal(element);

const generateLinePoints = (line) => {
  const [start, end] = line;
  const linePoints = [];
  const stepX = Math.sign(end.x - start.x);
  const stepY = Math.sign(end.y - start.y);

  const maxNumberOfSteps = Math.max(
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y),
  );

  for (let i = 0; i <= maxNumberOfSteps; i++) {
    const x = i * stepX + start.x;
    const y = i * stepY + start.y;

    linePoints.push({
      x,
      y,
    });
  }

  return linePoints;
};

const drawLineOnMap = (map, line) => {
  const linePoints = generateLinePoints(line);

  linePoints.forEach((point) => {
    if (!map[point.y]) map[point.y] = [];

    map[point.y][point.x] = map[point.y][point.x]
      ? map[point.y][point.x] + 1
      : 1;
  });

  return map;
};

const drawMap = (lines) => {
  let map = [];
  lines.forEach((line) => {
    map = drawLineOnMap(map, line);
  });
  return map;
};

const getIntersections = (lines) =>
  drawMap(lines)
    .flat()
    .filter((n) => n > 1).length;

const part1 = (rawInput) => {
  const input = processInput(rawInput);
  const nonDiagonals = input.filter(isNotDiagonal);
  const intersections = getIntersections(nonDiagonals);

  return intersections;
};

const part2 = (rawInput) => {
  const input = processInput(rawInput);
  const intersections = getIntersections(input);

  return intersections;
};

run({
  part1: {
    tests: [{ input: testData, expected: 5 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 12 }],
    solution: part2,
  },
  trimTestInputs: true,
});
