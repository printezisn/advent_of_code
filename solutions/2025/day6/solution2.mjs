import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .split("\n");

let op = "";
let acc = 0n;
let result = 0n;

for (let col = 0; col < lines[0].length; col++) {
  if (lines[lines.length - 1][col] !== " ") {
    op = lines[lines.length - 1][col];
    result += acc;
    acc = op === "+" ? 0n : 1n;
  }

  let num = null;
  for (let row = 0; row < lines.length - 1; row++) {
    if (lines[row][col] === " ") continue;

    num =
      num == null
        ? BigInt(lines[row][col])
        : BigInt(lines[row][col]) + num * 10n;
  }

  if (num == null) continue;

  if (op === "+") {
    acc += num;
  } else if (op === "*") {
    acc *= num;
  }
}

result += acc;

console.log(result);
