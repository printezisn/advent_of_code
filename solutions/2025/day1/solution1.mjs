import fs from "fs";
import path from "path";

const instructions = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.trim());

let result = 0;
let dial = 50;

instructions.forEach((instruction) => {
  const dir = instruction[0];
  const num = Number(instruction.slice(1));

  for (let i = 0; i < num; i++) {
    dial = dir === "L" ? dial - 1 : dial + 1;
    dial = (dial < 0 ? dial + 100 : dial) % 100;
  }

  if (dial === 0) {
    result++;
  }
});

console.log(result);
