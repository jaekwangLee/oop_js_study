class Vehicle {
  constructor(tires: number, fuel: number) {
    console.log(tires, fuel);
  }

  start = () => {
    console.log("start");
  };

  stop = () => {
    console.log("stop");
  };

  run = () => {
    console.log("keep going...");
  };
}

class Car extends Vehicle {
  constructor(
    private tires: number,
    private fuel: number,
    private owner: string
  ) {
    super(tires, fuel);
  }

  get spec() {
    return {
      tires: this.tires,
      fuel: this.fuel,
      owner: this.owner,
    };
  }

  get ownerName() {
    return this.owner;
  }
  set ownerName(newName: string) {
    this.owner = newName;
  }
}

class Motorcycle extends Vehicle {
  //   ...
}

class PorcheBoxter extends Car {
  run = () => {
    console.log("full accelerator!");
  };

  boost = () => {
    // ...
  };
}

class HyundaiSonata extends Car {
  run = () => {
    console.log("please, keep going...");
  };

  callEngineer = () => {
    // ...
  };
}

const myPorche = new PorcheBoxter(4, 58, "steve");
console.log(myPorche.start()); // start
console.log(myPorche.ownerName); // steve
console.log(myPorche.spec); // { tires: 4, fuel: 58, owner: 'steve' }
console.log(myPorche.run()); // full accelerator!
