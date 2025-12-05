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

const fresh = [];
let result = 0;

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

for (let i = 0; lines[i]; i++) {
  fresh.push(lines[i].split("-").map((n) => Number(n.trim())));
}

uniteRanges(fresh);

for (let i = 0; i < fresh.length; i++) {
  result += fresh[i][1] - fresh[i][0] + 1;
}

console.log(result);
