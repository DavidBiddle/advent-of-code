import run from "aocrunner";
import {
  parseInputToArray,
  getNeighbourCoordsIncludingDiagonalsAndSelf,
  parseIntBinary,
} from "../utils/index.mjs";

const get9DigitBinaryString = (matrix, x, y) => {
  const mapPoints = getNeighbourCoordsIncludingDiagonalsAndSelf(x, y);
  const bits = mapPoints.map((mapPoint) =>
    matrix?.[mapPoint.y]?.[mapPoint.x] == "#" ? 1 : 0,
  );
  return bits.join("");
};

const getPixelIndex = (matrix, x, y) =>
  parseIntBinary(get9DigitBinaryString(matrix, x, y));

const enhance = (image, algorithm) =>
  image.map((line, y) =>
    line.map((element, x) => algorithm.charAt(getPixelIndex(image, x, y))),
  );

const padMatrix = (matrix) => {
  const paddedImage = matrix.map((line) => [".", ...line, "."]);
  const paddingArray = Array(matrix[0].length).fill(".");
  return [paddingArray, ...paddedImage, paddingArray];
};

const processImage = (image) => {
  const imageAsMatrix = image.split(/\n/).map((line) => line.split(""));
  const paddedImage = padMatrix(padMatrix(imageAsMatrix));

  return paddedImage;
};

const part1 = (rawInput) => {
  const input = rawInput.split(/\n\n/);
  const [algorithm, imageRaw] = input;
  const image = processImage(imageRaw);
  const enhancedImage = enhance(image, algorithm);

  return enhancedImage.map((line) => line.join("")).join("\n");
};

const part2 = (rawInput) => {
  // const input = parseInputToArray(rawInput);
  // return input;
};

const testData = `
..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###
`;

run({
  part1: {
    tests: [{ input: testData, expected: 34 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 0 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
