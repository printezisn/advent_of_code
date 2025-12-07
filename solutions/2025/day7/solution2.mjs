import fs from "fs";
import path from "path";

const findTimelines = (
  splitters,
  totalRows,
  totalCols,
  startRow,
  startCol,
  dp = {}
) => {
  if (startRow >= totalRows || startCol < 0 || startCol >= totalCols) {
    return 0;
  }

  for (let row = startRow; row < totalRows; row++) {
    const position = row * totalCols + startCol;
    if (splitters.has(position)) {
      if (dp[position] != null) return dp[position];

      dp[position] =
        findTimelines(
          splitters,
          totalRows,
          totalCols,
          row + 1,
          startCol - 1,
          dp
        ) +
        findTimelines(
          splitters,
          totalRows,
          totalCols,
          row + 1,
          startCol + 1,
          dp
        );

      return dp[position];
    }
  }

  return 1;
};

let startRow,
  startCol,
  totalRows = 0,
  totalCols = 0;
const splitters = new Set();

fs.readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .forEach((line, row) => {
    const sanitizedLine = line.trim();
    totalRows++;
    totalCols = sanitizedLine.length;

    for (let col = 0; col < sanitizedLine.length; col++) {
      const char = sanitizedLine[col];
      if (char === "S") {
        startRow = row;
        startCol = col;
      } else if (char === "^") {
        splitters.add(row * sanitizedLine.length + col);
      }
    }
  });

console.log(findTimelines(splitters, totalRows, totalCols, startRow, startCol));
