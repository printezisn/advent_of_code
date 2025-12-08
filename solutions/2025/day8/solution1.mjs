import fs from "fs";
import path from "path";

const MAX_CONNECTIONS = 1000;

const calculateDistance = (coord1, coord2) => {
  const [x1, y1, z1] = coord1;
  const [x2, y2, z2] = coord2;

  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
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

for (let i = 0; i < MAX_CONNECTIONS; i++) {
  const [circuitA, circuitB] = pairs[i];

  circuitA.connected.push(circuitB);
  circuitB.connected.push(circuitA);
}

const groupMembers = [];
const passedCircuits = new Set();

for (let i = 0; i < circuits.length; i++) {
  if (passedCircuits.has(circuits[i])) {
    continue;
  }

  const nodesToCheck = [circuits[i]];
  let total = 0;
  while (nodesToCheck.length > 0) {
    const currentNode = nodesToCheck.pop();
    if (passedCircuits.has(currentNode)) {
      continue;
    }

    passedCircuits.add(currentNode);
    total++;

    for (const connectedCircuit of currentNode.connected) {
      if (!passedCircuits.has(connectedCircuit)) {
        nodesToCheck.push(connectedCircuit);
      }
    }
  }

  groupMembers.push(total);
}

groupMembers.sort((a, b) => Number(b) - Number(a));

console.log(groupMembers[0] * groupMembers[1] * groupMembers[2]);
