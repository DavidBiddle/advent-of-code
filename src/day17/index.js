import run from "aocrunner";
import { parseIntDecimal } from "../utils/index.js";

const processInput = (rawInput) => {
  const input = rawInput.match(
    /target area: x=(\d+)\.\.(\d+), y=(-*\d+)\.\.(-*\d+)/,
  );
  const { 1: xMinRaw, 2: xMaxRaw, 3: yMinRaw, 4: yMaxRaw } = input;
  const [xMin, xMax, yMin, yMax] = [xMinRaw, xMaxRaw, yMinRaw, yMaxRaw].map(
    parseIntDecimal,
  );

  return { xMin, xMax, yMin, yMax };
};

const tryFiring = (
  velocityX,
  velocityY,
  x,
  y,
  peakHeight,
  xMin,
  xMax,
  yMin,
  yMax,
) => {
  const newX = x + velocityX;
  const newY = y + velocityY;
  const newVelocityX = velocityX - Math.sign(velocityX);
  const newVelocityY = velocityY - 1;
  const newPeakHeight = Math.max(newY, peakHeight);

  if (newX > xMax || newY < yMin) {
    return false;
  } else if (newX <= xMax && newX >= xMin && newY >= yMin && newY <= yMax) {
    return { newX, newY, newPeakHeight };
  } else {
    return tryFiring(
      newVelocityX,
      newVelocityY,
      newX,
      newY,
      newPeakHeight,
      xMin,
      xMax,
      yMin,
      yMax,
    );
  }
};

const part1 = (rawInput) => {
  const { xMin, xMax, yMin, yMax } = processInput(rawInput);
  const successfulVelocities = [];
  for (let velocityX = 1; velocityX <= xMax; velocityX++) {
    for (let velocityY = 0; velocityY <= 1000; velocityY++) {
      const result = tryFiring(
        velocityX,
        velocityY,
        0,
        0,
        0,
        xMin,
        xMax,
        yMin,
        yMax,
      );
      if (result?.newX) {
        successfulVelocities.push(result.newPeakHeight);
      }
    }
  }

  return Math.max(...successfulVelocities);
};

const part2 = (rawInput) => {
  const { xMin, xMax, yMin, yMax } = processInput(rawInput);
  const successfulVelocities = [];
  for (let velocityX = 1; velocityX <= xMax; velocityX++) {
    for (let velocityY = -1000; velocityY <= 1000; velocityY++) {
      const result = tryFiring(
        velocityX,
        velocityY,
        0,
        0,
        0,
        xMin,
        xMax,
        yMin,
        yMax,
      );
      if (result?.newX) {
        successfulVelocities.push(result.newPeakHeight);
      }
    }
  }

  return successfulVelocities.length;
};

const testData = `target area: x=20..30, y=-10..-5`;

run({
  part1: {
    tests: [{ input: testData, expected: 45 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: testData, expected: 112 }],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
});
