import { readFileByLines } from '../utils/file-reader.js';

const file = await readFileByLines('02/02.txt');

/**
 * Calculate the number of safe reports.
 * A report is considered safe if:
 * - The levels are either all increasing or all decreasing.
 * - Any two adjacent levels differ by at least one and at most three.
 * @param reports
 */
function calculateSafeReportsCount(reports: string[]) {
  const IS_INCREASING = 1;
  const IS_DECREASING = -1;

  return reports.reduce((safeReportsCount, report) => {
    const levels = report.split(' ');
    let direction = IS_DECREASING;

    for (let i = 1; i < levels.length; i++) {
      const current = Number(levels[i]);
      const previous = Number(levels[i - 1]);

      if (i === 1 && current > previous) {
        direction = IS_INCREASING;
      }

      if (
        Math.abs(current - previous) > 3 ||
        current === previous ||
        (direction === IS_INCREASING && current < previous) ||
        (direction === IS_DECREASING && current > previous)
      ) {
        return safeReportsCount;
      }
    }

    return safeReportsCount + 1;
  }, 0);
}

/**
 * Calculate the number of safe reports with a problem dampener.
 * A report is considered safe if:
 * - The levels are either all increasing or all decreasing.
 * - Any two adjacent levels differ by at least one and at most three.
 * - If a single level is removed, the report becomes safe.
 * @param reports
 */
function calculateSafeProblemDampenerReportsCount(reports: string[]) {
  const IS_INCREASING = 1;
  const IS_DECREASING = -1;

  function isSafe(levels: number[]): boolean {
    let direction = IS_DECREASING;

    for (let i = 1; i < levels.length; i++) {
      const current = Number(levels[i]);
      const previous = Number(levels[i - 1]);

      if (i === 1 && current > previous) {
        direction = IS_INCREASING;
      }

      if (
        Math.abs(current - previous) > 3 ||
        current === previous ||
        (direction === IS_INCREASING && current < previous) ||
        (direction === IS_DECREASING && current > previous)
      ) {
        return false;
      }
    }
    return true;
  }

  function canBecomeSafe(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
      const reducedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(reducedLevels)) {
        return true;
      }
    }
    return false;
  }

  return reports.reduce((safeReportsCount, report) => {
    const levels = report.split(' ').map(Number);

    if (isSafe(levels) || canBecomeSafe(levels)) {
      return safeReportsCount + 1;
    }

    return safeReportsCount;
  }, 0);
}

const safeReportsCount = calculateSafeReportsCount(file);
const safeProblemDampenerReportsCount = calculateSafeProblemDampenerReportsCount(file);

console.log('Safe reports count: ', safeReportsCount);
console.log('Safe problem dampener reports count: ', safeProblemDampenerReportsCount);
