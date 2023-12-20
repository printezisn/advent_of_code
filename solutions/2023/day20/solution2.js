const fs = require("fs");

class Mod {
  constructor(name, destinations) {
    this.name = name;
    this.inputs = {};
    this.status = false;
    this.hasAcknowledgesConnection = false;
    this.destinations = destinations;
  }

  receivePulse(pulse, _input = "") {
    return this.destinations.map((d) => [this.name, d, pulse]);
  }

  acknowledgeConnection(mods, input = "") {
    this.inputs[input] = false;
    if (this.hasAcknowledgesConnection) return;

    this.hasAcknowledgesConnection = true;
    this.destinations.forEach((d) => {
      mods[d]?.acknowledgeConnection(mods, this.name);
    });
  }
}

class BroadcasterMod extends Mod {
  constructor(destinations) {
    super("broadcaster", destinations);
  }
}

class FlipFlopMod extends Mod {
  constructor(name, destinations) {
    super(name, destinations);
  }

  receivePulse(pulse, _input) {
    if (pulse) return [];

    this.status = !this.status;
    return super.receivePulse(this.status);
  }
}

class ConjunctionMod extends Mod {
  constructor(name, destinations) {
    super(name, destinations);
  }

  receivePulse(pulse, input) {
    this.inputs[input] = pulse;
    const sentPulse = !Object.values(this.inputs).every(Boolean);

    return super.receivePulse(sentPulse);
  }
}

class ButtonMod extends Mod {
  constructor() {
    super("button", ["broadcaster"]);
  }
}

const createMod = (mod, destinations) => {
  if (mod === "broadcaster") {
    return new BroadcasterMod(destinations);
  } else if (mod[0] === "%") {
    return new FlipFlopMod(mod.substring(1), destinations);
  } else if (mod[0] === "&") {
    return new ConjunctionMod(mod.substring(1), destinations);
  }

  return null;
};

const pressButton = (mods, button) => {
  const pulses = button.receivePulse(false);

  while (pulses.length > 0) {
    const [input, mod, pulse] = pulses.shift();
    if (mod === "rx" && !pulse) return true;

    mods[mod]?.receivePulse(pulse, input)?.forEach((newPulse) => {
      pulses.push(newPulse);
    });
  }

  return false;
};

const runSimulation = (mods) => {
  const button = new ButtonMod();
  button.acknowledgeConnection(mods);

  for (let i = 0; ; i++) {
    if (pressButton(mods, button)) return i;
  }
};

const lines = fs.readFileSync("./input.txt").toString().split("\n");
const mods = {};

lines.forEach((line) => {
  const [mod, destinationsStr] = line.trim().replace(/ /g, "").split("->");
  const destinations = destinationsStr.split(",");

  const modObj = createMod(mod, destinations);
  mods[modObj.name] = modObj;
});

console.log(runSimulation(mods));
