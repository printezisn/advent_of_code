import fs from "fs";
import path from "path";

const calculateArea = (rectangle) => {
  const { x1, x2, y1, y2 } = rectangle;

  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
};

const makeRectangle = (point1, point2) => {
  return {
    x1: Math.min(point1[0], point2[0]),
    y1: Math.min(point1[1], point2[1]),
    x2: Math.max(point1[0], point2[0]),
    y2: Math.max(point1[1], point2[1]),
  };
};

const hasCollision = (rectangle1, rectangle2) => {
  const isLeft = rectangle1.x2 <= rectangle2.x1;
  const isRight = rectangle1.x1 >= rectangle2.x2;
  const isTop = rectangle1.y2 <= rectangle2.y1;
  const isBottom = rectangle1.y1 >= rectangle2.y2;

  return !isLeft && !isRight && !isTop && !isBottom;
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

const lines = [];
for (let i = 0; i < tiles.length; i++) {
  let j = (i + 1) % tiles.length;
  lines.push(makeRectangle(tiles[i], tiles[j]));
}

const candidateRectangles = [];
for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    candidateRectangles.push(makeRectangle(tiles[i], tiles[j]));
  }
}

let result = 0;
candidateRectangles.forEach((rectangle) => {
  let i;

  for (i = 0; i < lines.length; i++) {
    if (hasCollision(lines[i], rectangle)) {
      break;
    }
  }

  if (i === lines.length) {
    result = Math.max(result, calculateArea(rectangle));
  }
});

console.log(result);
