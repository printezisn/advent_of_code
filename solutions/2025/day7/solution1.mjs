import fs from "fs";
import path from "path";

let start,
  totalRows = 0,
  totalCols = 0,
  result = 0;
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
        start = row * sanitizedLine.length + col;
      } else if (char === "^") {
        splitters.add(row * sanitizedLine.length + col);
      }
    }
  });

let activeBeams = new Set([start + totalCols]);

for (let row = 0; row < totalRows; row++) {
  const newBeams = new Set();

  for (const beam of activeBeams) {
    const nextBeam = beam + totalCols;
    const nextCol = nextBeam % totalCols;

    if (splitters.has(nextBeam)) {
      if (nextCol > 0) {
        newBeams.add(nextBeam - 1);
      }
      if (nextCol < totalCols - 1) {
        newBeams.add(nextBeam + 1);
      }

      result++;
    } else {
      newBeams.add(nextBeam);
    }
  }

  activeBeams = newBeams;
}

console.log(result);
