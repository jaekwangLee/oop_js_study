{
  interface NormalCar {
    start(): void;
    stop(): void;
    run(): void;
    spec: Specifications;
    ownerName: string;
  }

  interface SuperCar {
    start(): void;
    stop(): void;
    run(): void;
    boost(): void;
    spec: Specifications;
    ownerName: string;
  }

  type Specifications = {
    tires: number;
    fuel: number;
    owner: string;
  };

  type OnOff = "off" | "on";

  class Vehicle {
    private engine: OnOff = "off";
    constructor(tires: number, fuel: number) {
      console.log(tires, fuel);
    }

    start = (): void => {
      console.log("start");
      this.engineToggle("on");
    };

    stop = (): void => {
      console.log("stop");
      this.engineToggle("off");
    };

    run = (): void => {
      console.log("keep going...");
    };

    boost = (): void => {
      console.log("speed up!!!");
    };

    get status() {
      return "car status : " + this.engine;
    }

    private engineToggle = (nextStatus: OnOff): void => {
      this.engine = nextStatus;
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

  // car 인스턴스 생성
  const myCar = new Car(4, 50, "steve");
  myCar.start();
  console.log(myCar.status);
  myCar.stop();
  console.log(myCar.status);

  // car 인스턴스 생성할 때 interface를 이용해 추상화
  const myFamilyCar: NormalCar = new Car(4, 60, "steve_family");
  // myFamilyCar.boost() <-- error

  const myHobbyCar: SuperCar = new Car(4, 48, "steve_hobby");
  myHobbyCar.boost();
}
