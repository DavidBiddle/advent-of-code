/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.js,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 */
const slidingTotal = (element, index, array) => {
  return index >= 2
    ? parseInt(element) +
        parseInt(array[index - 1]) +
        parseInt(array[index - 2])
    : null;
};

const arrayCompare = (element, index, array) => {
  return (
    index > 0 && array[index - 1] !== null && element - array[index - 1] > 0
  );
};

const parseInputToArray = (rawInput) => rawInput.split("\n");

const parseIntDecimal = (string) => parseInt(string, 10);

const parseIntBinary = (string) => parseInt(string, 2);

const add = (accumulator, value) => accumulator + value;

const multiply = (accumulator, value) => accumulator * value;

const sumArray = (array) => array.reduce(add, 0);

const multiplyArray = (array) => array.reduce(multiply, 1);

const compareNumbers = (a, b) => a - b;

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const getOccurences = (array) =>
  array.reduce(function (obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});

// nicked this from stackoverflow
const transposeMatrix = (array) => {
  return Object.keys(array[0]).map((column) => array.map((row) => row[column]));
};

const isOutOfBounds = (grid, x, y) =>
  y < 0 || y >= grid.length || x < 0 || x >= grid[0].length;

const splitByEmptyString = (string) => string.split("");
const splitBySpace = (string) => string.split(" ");
const splitByComma = (string) => string.split(",");

const isSuperset = (set, subset) => {
  for (let elem of subset) {
    if (set.indexOf(elem) === -1) {
      return false;
    }
  }
  return true;
};

const getNeighbourCoords = (x, y) => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x, y: y + 1 },
];

const getNeighbourCoordsIncludingDiagonals = (x, y) => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x, y: y + 1 },
  { x: x - 1, y: y - 1 },
  { x: x + 1, y: y + 1 },
  { x: x + 1, y: y - 1 },
  { x: x - 1, y: y + 1 },
];

const getUniqueValues = (values) => {
  const stringifiedValues = values.map(JSON.stringify);
  const uniqueStringifiedValues = [...new Set(stringifiedValues)];
  const uniqueValues = uniqueStringifiedValues.map(JSON.parse);

  return uniqueValues;
};

const safelyIncrementObjectValue = (
  object,
  valueToIncrement,
  incrementSize,
) => {
  const newObject = Object.assign({}, object);

  if (!(valueToIncrement in newObject)) {
    newObject[valueToIncrement] = 0;
  }
  newObject[valueToIncrement] += incrementSize;

  return newObject;
};

const getDifferenceBetweenMaxAndMin = (array) =>
  Math.max(...array) - Math.min(...array);

const setContains = (set, itemToCheck) => set.has(JSON.stringify(itemToCheck));

export {
  slidingTotal,
  arrayCompare,
  parseInputToArray,
  parseIntDecimal,
  parseIntBinary,
  sumArray,
  multiplyArray,
  compareNumbers,
  transposeMatrix,
  isOutOfBounds,
  range,
  splitByEmptyString,
  splitBySpace,
  splitByComma,
  isSuperset,
  getNeighbourCoords,
  getNeighbourCoordsIncludingDiagonals,
  getUniqueValues,
  getOccurences,
  safelyIncrementObjectValue,
  getDifferenceBetweenMaxAndMin,
  setContains,
};
