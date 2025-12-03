import fs from "fs";
import path from "path";

const banks = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()).map(Number));

let result = 0;

banks.forEach((bank) => {
  let curMax = -1;
  let curMaxIndex = 0;

  for (let i = 1; i < bank.length; i++) {
    const num = bank[curMaxIndex] * 10 + bank[i];
    curMax = Math.max(curMax, num);
    if (bank[i] > bank[curMaxIndex]) {
      curMaxIndex = i;
    }
  }

  result += curMax;
});

console.log(result);
