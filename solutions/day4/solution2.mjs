import fs from "fs";
import path from "path";

const getNeighbours = (papers, row, col) => {
  return [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ].filter(([r, c]) => papers[r]?.[c]);
};

const papers = {};
let cont = true;
let result = 0;

fs.readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .forEach((line, row) => {
    Array.from(line.trim()).forEach((char, col) => {
      if (char === "@") {
        papers[row] = papers[row] || {};
        papers[row][col] = true;
      }
    });
  });

while (cont) {
  const papersToRemove = [];

  for (const row in papers) {
    for (const col in papers[row]) {
      if (getNeighbours(papers, Number(row), Number(col)).length < 4) {
        result++;
        papersToRemove.push([Number(row), Number(col)]);
      }
    }
  }

  cont = papersToRemove.length > 0;

  for (const [row, col] of papersToRemove) {
    delete papers[row][col];
    if (Object.keys(papers[row]).length === 0) {
      delete papers[row];
    }
  }
}

console.log(result);
