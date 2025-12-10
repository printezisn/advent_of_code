import fs from "fs";
import path from "path";

const calculateArea = (point1, point2) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
};

const tiles = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split(",")
      .map((num) => Number(num.trim()))
  );

let result = 0;

for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    result = Math.max(result, calculateArea(tiles[i], tiles[j]));
  }
}

console.log(result);
