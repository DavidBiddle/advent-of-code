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

const sumArray = (array) => array.reduce(add, 0);

const compareNumbers = (a, b) => a - b;

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// nicked this from stackoverflow
const transposeMatrix = (array) => {
  return Object.keys(array[0]).map((column) => array.map((row) => row[column]));
};

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

export {
  slidingTotal,
  arrayCompare,
  parseInputToArray,
  parseIntDecimal,
  parseIntBinary,
  sumArray,
  compareNumbers,
  transposeMatrix,
  range,
  splitBySpace,
  splitByComma,
  isSuperset,
};
