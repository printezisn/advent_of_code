import fs from "fs";
import path from "path";

const uniteRanges = (ranges) => {
  ranges.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i][1] >= ranges[i + 1][0]) {
      ranges[i][1] = Math.max(ranges[i][1], ranges[i + 1][1]);
      ranges.splice(i + 1, 1);
      i--;
    }
  }
};

const rangesOverlap = (range1, range2) => {
  return range1[0] <= range2[1] && range1[1] >= range2[0];
};

const fresh = [];
let i,
  result = 0;

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

for (i = 0; lines[i]; i++) {
  fresh.push(lines[i].split("-").map((n) => Number(n.trim())));
}

uniteRanges(fresh);

for (i++; i < lines.length; i++) {
  const num = Number(lines[i].trim());

  for (let j = 0; j < fresh.length; j++) {
    if (rangesOverlap(fresh[j], [num, num])) {
      result++;
      break;
    }
  }
}

console.log(result);
