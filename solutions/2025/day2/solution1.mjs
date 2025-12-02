import fs from "fs";
import path from "path";

const isInvalid = (num) => {
  const str = num.toString();

  return str.slice(0, str.length / 2) === str.slice(str.length / 2);
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
