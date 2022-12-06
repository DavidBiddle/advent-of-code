import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const getNumberOfUniqueEntriesInLastNItems = (letter, index, array, n) => {
  const startIndex = Math.max(index + 1 - n, 0);
  const lastNItems = array.slice(startIndex, index + 1);

  return new Set(lastNItems).size;
};

const getAnswerForNUniqueItems = (input, n) => {
  const mappingFunction = (array, index, element) => {
    return getNumberOfUniqueEntriesInLastNItems(array, index, element, n);
  };

  return (
    input
      .map(mappingFunction)
      .map((x) => x == n)
      .indexOf(true) + 1
  );
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("");
  const answer = getAnswerForNUniqueItems(input, 4);

  return answer;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("");
  const answer = getAnswerForNUniqueItems(input, 14);

  return answer;
};

const testData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const testData2 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const testData3 = `nppdvjthqldpwncqszvftbrmjlhg`;
const testData4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const testData5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

run({
  part1: {
    tests: [
      {
        input: testData,
        expected: 7,
      },
      {
        input: testData2,
        expected: 5,
      },
      {
        input: testData3,
        expected: 6,
      },
      {
        input: testData4,
        expected: 10,
      },
      {
        input: testData5,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testData,
        expected: 19,
      },
      {
        input: testData2,
        expected: 23,
      },
      {
        input: testData3,
        expected: 23,
      },
      {
        input: testData4,
        expected: 29,
      },
      {
        input: testData5,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
