import run from "aocrunner";
import {
  parseInputToArray,
  splitByEmptyString,
  sumArray,
  compareNumbers,
} from "../utils/index.js";

const invalidCharacterScores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const lineEndingCharacterScores = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const getScoreForCharacter = (character, characterScores) =>
  characterScores[character];

const getScoreForInvalidCharacter = (character) =>
  getScoreForCharacter(character, invalidCharacterScores);

const getScoreForLineEnding = (line) => {
  let totalScore = 0;

  line.forEach((character) => {
    totalScore *= 5;
    totalScore += getScoreForCharacter(character, lineEndingCharacterScores);
  });

  return totalScore;
};

const isClosingBracket = (character) =>
  ["}", "]", ")", ">"].indexOf(character) !== -1;
const isOpeningBracket = (character) => !isClosingBracket(character);

const processLine = (line) => {
  const correspondingClosingBrackets = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
  };

  let invalidCharacter = null;
  const stack = [];

  line.forEach((element) => {
    if (isOpeningBracket(element)) {
      stack.push(correspondingClosingBrackets[element]);
    }
    if (isClosingBracket(element)) {
      if (element !== stack[stack.length - 1]) {
        invalidCharacter = element;
      }
      stack.pop();
    }
  });

  const isCorrupted = !!invalidCharacter;
  const isIncomplete = !isCorrupted && stack.length;
  const missingLineEndings = stack.reverse();

  return { isCorrupted, isIncomplete, missingLineEndings, invalidCharacter };
};

const getFirstIncorrectCharacter = (line) => {
  const { isCorrupted, invalidCharacter } = processLine(line);

  if (isCorrupted) return invalidCharacter;
};

const getMissingLineEnding = (line) => {
  const { isIncomplete, missingLineEndings } = processLine(line);

  if (isIncomplete) return missingLineEndings;
};

const part1 = (rawInput) => {
  const input = parseInputToArray(rawInput).map(splitByEmptyString);

  const incorrectCharacters = input
    .map((line) => getFirstIncorrectCharacter(line))
    .filter((line) => !!line);
  const scores = incorrectCharacters.map(getScoreForInvalidCharacter);

  return sumArray(scores);
};

const part2 = (rawInput) => {
  const input = parseInputToArray(rawInput).map(splitByEmptyString);

  const lineEndings = input
    .map((line) => getMissingLineEnding(line))
    .filter((line) => !!line);

  const scores = lineEndings.map(getScoreForLineEnding).sort(compareNumbers);
  const middleScore = scores[Math.floor(scores.length / 2)];

  return middleScore;
};

const testData = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`;

run({
  part1: {
    tests: [{ input: testData, expected: 26397 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 288957 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
