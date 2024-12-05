import { readFile } from '../utils/file-reader.js';

const file = readFile('03/03.txt');

/**
 * Extracts all multipliers from a string formatted as "mul(a,b)".
 * @param input
 */
function extractMultipliers(input: string) {
  return input.match(/mul\((\d+),(\d+)\)/g);
}

/**
 * Parses a mul(a, b) token and returns the computed result or null if invalid.
 * @param token
 * @returns The result of the multiplication or 0 if parsing fails.
 */
function parseAndEvaluateMultiplier(token: string) {
  const parsedExpression = token.match(/mul\((\d+),(\d+)\)/);

  if (parsedExpression) {
    const [, multiplier, multiplicand] = parsedExpression;
    return Number(multiplier) * Number(multiplicand);
  }

  return 0;
}

/**
 * Adds all multipliers from a string formatted as "mul(a,b)".
 * @param input
 */
function addAllMultipliers(input: string) {
  const mules = extractMultipliers(input);

  return mules?.reduce((accumulator, mule) => {
    const result = parseAndEvaluateMultiplier(mule);
    return accumulator + result;
  }, 0);
}

/**
 * Processes the input string to compute the sum of enabled multipliers.
 * Handles the "do()" and "don't()" instructions to enable or disable multiplications.
 * @param input
 */
function addAllEnabledMultipliers(input: string) {
  const tokens = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

  if (!tokens) return 0;

  let isEnabled = true;

  return tokens.reduce((accumulator, token) => {
    if (token === 'do()') {
      isEnabled = true;
    } else if (token === "don't()") {
      isEnabled = false;
    } else if (isEnabled && token.startsWith('mul')) {
      return accumulator + parseAndEvaluateMultiplier(token);
    }
    return accumulator;
  }, 0);
}

const multipliers = addAllMultipliers(file);
const enabledMultipliers = addAllEnabledMultipliers(file);

console.log(multipliers);
console.log(enabledMultipliers);
