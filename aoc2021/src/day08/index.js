import run from "aocrunner";
import {
  parseInputToArray,
  parseIntDecimal,
  splitBySpace,
  isSuperset,
  sumArray,
} from "../utils/index.mjs";

const processInput = (rawInput) => {
  const input = parseInputToArray(rawInput)
    .map(splitBySpace)
    .map((element) => ({
      signals: element.slice(0, 10),
      outputs: element.slice(11),
    }));
  return input;
};

const getEasyCodesFromLength = (item) => {
  switch (item.length) {
    case 2:
      return 1;
    case 3:
      return 7;
    case 4:
      return 4;
    case 7:
      return 8;
  }
};

const decode5 = (item, known) => {
  if (isSuperset(item, known[1])) {
    return 3;
  } else if (isSuperset(known[6], item)) {
    return 5;
  } else {
    return 2;
  }
};

const decode6 = (item, known) => {
  if (isSuperset(item, known[4])) {
    return 9;
  } else if (isSuperset(item, known[1])) {
    return 0;
  }
  return 6;
};

const decodeSignalsForLine = (array) => {
  const knownValues = [];

  array.signals.forEach((item) => {
    const index = getEasyCodesFromLength(item);
    knownValues[index] = item;
  });

  array.signals.forEach((item) => {
    if (item.length === 6) {
      const index = decode6(item, knownValues);
      knownValues[index] = item;
    }
  });

  array.signals.forEach((item) => {
    if (item.length === 5) {
      const index = decode5(item, knownValues);
      knownValues[index] = item;
    }
  });

  const knownValuesAsStrings = knownValues.map((knownValue) =>
    [...knownValue].sort().join(""),
  );

  const orderedOutputs = array.outputs.map((output) =>
    output
      .split("")
      .sort()
      .join(""),
  );

  const outputValues = orderedOutputs.map((output) =>
    knownValuesAsStrings.indexOf(output),
  );

  return parseIntDecimal(outputValues.join(""));
};

const part1 = (rawInput) => {
  const input = processInput(rawInput);
  const decodedEasyCodes = input
    .map((element) => element.outputs.map(getEasyCodesFromLength))
    .flat()
    .filter((element) => typeof element === "number");
  const numberOfEasyCodes = decodedEasyCodes.length;

  return numberOfEasyCodes;
};

const part2 = (rawInput) => {
  const input = processInput(rawInput);
  const decodedOutputs = input.map(decodeSignalsForLine);

  return sumArray(decodedOutputs);
};

const testData = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

run({
  part1: {
    tests: [{ input: testData, expected: 26 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 61229 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
