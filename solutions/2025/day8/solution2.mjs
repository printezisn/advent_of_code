import fs from "fs";
import path from "path";

const calculateDistance = (coord1, coord2) => {
  const [x1, y1, z1] = coord1;
  const [x2, y2, z2] = coord2;

  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
};

const isSingleGraph = (circuits) => {
  const passedCircuits = new Set();
  const nodesToCheck = [circuits[0]];

  while (nodesToCheck.length > 0) {
    const currentNode = nodesToCheck.pop();
    if (passedCircuits.has(currentNode)) {
      continue;
    }

    passedCircuits.add(currentNode);

    for (const connectedCircuit of currentNode.connected) {
      if (!passedCircuits.has(connectedCircuit)) {
        nodesToCheck.push(connectedCircuit);
      }
    }
  }

  return passedCircuits.size === circuits.length;
};

const circuits = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"))
  .toString()
  .trim()
  .split("\n")
  .map((line) => ({
    coords: line
      .trim()
      .split(",")
      .map((instr) => Number(instr.trim())),
    connected: [],
  }));

const pairs = [];

for (let i = 0; i < circuits.length; i++) {
  for (let j = i + 1; j < circuits.length; j++) {
    pairs.push([circuits[i], circuits[j]]);
  }
}

pairs.sort(
  (a, b) =>
    calculateDistance(a[0].coords, a[1].coords) -
    calculateDistance(b[0].coords, b[1].coords)
);

let i = 0;
let result = 0;

while (!isSingleGraph(circuits)) {
  const [circuitA, circuitB] = pairs[i];

  circuitA.connected.push(circuitB);
  circuitB.connected.push(circuitA);
  i++;
  result = circuitA.coords[0] * circuitB.coords[0];
}

console.log(result);
