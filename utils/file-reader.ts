import * as fs from 'fs';
import * as readline from 'readline';

/**
 * Reads a text file line by line and returns an array of lines.
 * @param filePath - The path to the text file.
 * @returns A promise that resolves to an array of lines.
 */
export async function readFileByLines(filePath: string): Promise<string[]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const lines: string[] = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
}
