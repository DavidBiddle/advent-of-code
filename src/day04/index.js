import run from "aocrunner";
import { parseIntDecimal, sumArray, transposeMatrix } from "../utils/index.js";

const testData = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
 `;

const processInput = (rawInput) => {
  const input = rawInput.split(/\n\n/);
  const numbersCalledOut = input[0].split(",").map(parseIntDecimal);
  const cards = input.slice(1).map((element) => {
    const card = { rows: [], columns: [] };
    card.rows = element
      .split(/\n/)
      .map((row) =>
        row.trim().replaceAll("  ", " ").split(" ").map(parseIntDecimal),
      );
    card.columns = transposeMatrix(card.rows);

    return card;
  });

  return [numbersCalledOut, cards];
};

const rowOrColumnMatches = (calls, rowOrColumn) => {
  return rowOrColumn.every((item) => calls.indexOf(item) > -1);
};

const checkCard = (calls, card) => {
  const rowMatches = card.rows.filter((row) => rowOrColumnMatches(calls, row));
  const columnMatches = card.columns.filter((column) =>
    rowOrColumnMatches(calls, column),
  );
  return rowMatches.length || columnMatches.length;
};

const getUnmatchedNumbers = (calls, card) => {
  return card.rows.flat().filter((item) => calls.indexOf(item) == -1);
};

const getNthWinningCard = (numbersCalledOut, cards, n) => {
  let winners = [];
  let calls = [];

  for (let i = 0; i < numbersCalledOut.length; i++) {
    const currentCalls = numbersCalledOut.slice(0, i + 1);

    const newWinningCards = cards.filter((card) => {
      return checkCard(currentCalls, card) && winners.indexOf(card) == -1;
    });
    if (newWinningCards.length) {
      winners = [...winners, ...newWinningCards];
      calls = currentCalls;
    }
    if (winners.length === n) {
      break;
    }
  }

  return {
    unmatchedNumbers: getUnmatchedNumbers(calls, winners[n - 1]),
    lastCall: calls[calls.length - 1],
  };
};

const part1 = (rawInput) => {
  const [numbersCalledOut, cards] = processInput(rawInput);

  const firstWinnerObject = getNthWinningCard(numbersCalledOut, cards, 1);

  return (
    sumArray(firstWinnerObject.unmatchedNumbers) * firstWinnerObject.lastCall
  );
};

const part2 = (rawInput) => {
  const [numbersCalledOut, cards] = processInput(rawInput);

  const lastWinnerObject = getNthWinningCard(
    numbersCalledOut,
    cards,
    cards.length,
  );

  return (
    sumArray(lastWinnerObject.unmatchedNumbers) * lastWinnerObject.lastCall
  );
};

run({
  part1: {
    tests: [{ input: testData, expected: 4512 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 1924 }],
    solution: part2,
  },
  trimTestInputs: true,
});
