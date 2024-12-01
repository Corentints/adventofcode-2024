import { readFileByLines } from '../utils/file-reader.js';

function extractLocations(input: string[]): [number[], number[]] {
  const leftLocations: number[] = [];
  const rightLocations: number[] = [];

  input.forEach((line) => {
    const locations = line.trim().split(/[\s,]+/);

    const left = Number(locations[0]);
    const right = Number(locations[1]);

    leftLocations.push(left);
    rightLocations.push(right);
  });

  return [leftLocations, rightLocations];
}

function calculateDistance(input: string[]) {
  const [leftLocations, rightLocations] = extractLocations(input);
  let distance = 0;

  leftLocations.sort((a, b) => a - b);
  rightLocations.sort((a, b) => a - b);

  for (let i = 0; i < leftLocations.length; i++) {
    const leftLocation = leftLocations[i] ?? 0;
    const rightLocation = rightLocations[i] ?? 0;

    distance += Math.abs(leftLocation - rightLocation);
  }

  return distance;
}

function calculateSimilarityScore(input: string[]) {
  const [leftLocations, rightLocations] = extractLocations(input);

  const rightLocationCounts = new Map<number, number>();
  for (const location of rightLocations) {
    rightLocationCounts.set(location, (rightLocationCounts.get(location) || 0) + 1);
  }

  let similarityScore = 0;

  for (const left of leftLocations) {
    if (rightLocationCounts.has(left)) {
      const rightCount = rightLocationCounts.get(left);

      if (rightCount) {
        similarityScore += rightCount * left;
        rightLocationCounts.delete(left);
      }
    }
  }

  return similarityScore;
}

const file = await readFileByLines('01/01.txt');
const distance = calculateDistance(file);

console.log('Distance: ', distance);
console.log('Similarity Score: ', calculateSimilarityScore(file));
