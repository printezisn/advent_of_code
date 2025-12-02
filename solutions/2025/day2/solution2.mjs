import fs from "fs";
import path from "path";

const repeatStr = (str, times) => {
  let result = "";

  for (let i = 0; i < times; i++) {
    result += str;
  }

  return result;
};

const isInvalid = (num) => {
  const str = num.toString();

  for (let i = 1; i <= str.length / 2; i++) {
    if (str.length % i !== 0) continue;

    const repeatTimes = str.length / i;
    const strToCheck = repeatStr(str.slice(0, i), repeatTimes);

    if (strToCheck === str) {
      return true;
    }
  }

  return false;
};

const ranges = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split(",")
  .map((range) => {
    const [start, end] = range.split("-").map((part) => Number(part.trim()));
    return { start, end };
  });

let result = 0;

ranges.forEach(({ start, end }) => {
  for (let i = start; i <= end; i++) {
    if (isInvalid(i)) {
      result += i;
    }
  }
});

console.log(result);
