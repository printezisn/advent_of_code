import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim().split(/\s+/));

let result = 0n;

for (let i = 0; i < lines[0].length; i++) {
  const op = lines[lines.length - 1][i];
  let acc = op === "+" ? 0n : 1n;

  for (let j = 0; j < lines.length - 1; j++) {
    if (op === "+") {
      acc += BigInt(lines[j][i]);
    } else {
      acc *= BigInt(lines[j][i]);
    }
  }

  result += acc;
}

console.log(result);
