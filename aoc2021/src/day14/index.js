import run from "aocrunner";
import {
  parseInputToArray,
  getOccurences,
  safelyIncrementObjectValue,
  getDifferenceBetweenMaxAndMin,
} from "../utils/index.mjs";

const getPairsFromString = (string) =>
  string
    .split("")
    .map((element, index, array) =>
      index + 1 < array.length ? `${element}${array[index + 1]}` : null,
    )
    .slice(0, -1);

const processInput = (rawInput) => {
  const [template, rulesRaw] = rawInput.split(/\n\n/);

  const rules = parseInputToArray(rulesRaw)
    .map((element) => element.split(" -> "))
    .map((rule) => {
      const input = rule[0];
      const outputPairs = [];
      outputPairs.push(
        `${rule[0].substring(0, 1)}${rule[1]}`,
        `${rule[1]}${rule[0].substring(1)}`,
      );

      return {
        input,
        output: outputPairs,
      };
    });

  const pairs = getPairsFromString(template);
  const pairFrequencies = getOccurences(pairs);

  return { rules, pairFrequencies };
};

const getRuleOutputs = (pair, rules) => {
  return rules.filter((rule) => rule.input === pair)[0].output;
};

const polymerise = (pairFrequencies, rules) => {
  let newFrequencies = {};
  for (const pair in pairFrequencies) {
    const ruleOutputs = getRuleOutputs(pair, rules);
    ruleOutputs.forEach((ruleOutput) => {
      newFrequencies = safelyIncrementObjectValue(
        newFrequencies,
        ruleOutput,
        pairFrequencies[pair],
      );
    });
  }
  return newFrequencies;
};

const polymeriseNTimes = (frequencies, rules, n) => {
  if (n === 0) {
    return frequencies;
  }

  const newFrequencies = polymerise(frequencies, rules);

  return polymeriseNTimes(newFrequencies, rules, n - 1);
};

const getLetterFrequencies = (pairFrequencies) => {
  let doubledLetterFrequencies = {};
  let letterFrequencies = {};

  for (const pair of Object.keys(pairFrequencies)) {
    const [firstLetter, secondLetter] = pair.split("");
    doubledLetterFrequencies = safelyIncrementObjectValue(
      doubledLetterFrequencies,
      firstLetter,
      pairFrequencies[pair],
    );
    doubledLetterFrequencies = safelyIncrementObjectValue(
      doubledLetterFrequencies,
      secondLetter,
      pairFrequencies[pair],
    );
  }

  for (const letter of Object.keys(doubledLetterFrequencies)) {
    const value = Math.ceil(doubledLetterFrequencies[letter] / 2);

    letterFrequencies = safelyIncrementObjectValue(
      letterFrequencies,
      letter,
      value,
    );
  }

  return letterFrequencies;
};

const letterFrequenciesAfterNSteps = (pairFrequencies, rules, n) => {
  const pairFrequenciesAfterNSteps = polymeriseNTimes(
    pairFrequencies,
    rules,
    n,
  );
  const letterFrequencies = getLetterFrequencies(pairFrequenciesAfterNSteps);

  return letterFrequencies;
};

const part1 = (rawInput) => {
  const { rules, pairFrequencies } = processInput(rawInput);

  const letterFrequencies = letterFrequenciesAfterNSteps(
    pairFrequencies,
    rules,
    10,
  );

  const answer = getDifferenceBetweenMaxAndMin(
    Object.values(letterFrequencies),
  );

  return answer;
};

const part2 = (rawInput) => {
  const { rules, pairFrequencies } = processInput(rawInput);

  const letterFrequencies = letterFrequenciesAfterNSteps(
    pairFrequencies,
    rules,
    40,
  );
  const answer = getDifferenceBetweenMaxAndMin(
    Object.values(letterFrequencies),
  );

  return answer;
};

const testData = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

run({
  part1: {
    tests: [{ input: testData, expected: 1588 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 2188189693529 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
