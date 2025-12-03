import fs from "fs";
import path from "path";

const findMaxJoltage = (bank, totalPairs = 12, index = 0, dp = {}) => {
  if (totalPairs === 0) return 0;

  const key = `${index}-${totalPairs}`;
  if (dp[key] != null) return dp[key];

  const joltage = bank[index] * Math.pow(10, totalPairs - 1);

  if (index + totalPairs === bank.length) {
    dp[key] = Number(bank.slice(index).join(""));
  } else {
    dp[key] = Math.max(
      joltage + findMaxJoltage(bank, totalPairs - 1, index + 1, dp),
      findMaxJoltage(bank, totalPairs, index + 1, dp)
    );
  }

  return dp[key];
};

const banks = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => Array.from(line.trim()).map(Number));

let result = 0;

banks.forEach((bank) => {
  result += findMaxJoltage(bank);
});

console.log(result);
