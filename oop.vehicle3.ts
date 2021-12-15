{
  interface Engine {
    run(): boolean;
    stop(): boolean;
    pressure: string; // 'weak' | 'strong' | 'normal';
  }

  interface Mission {
    mode: string; // auto | manual
    change(gear: number): number;
    clutch(): void;
    getGear(): number;
  }

  interface Frame {
    material: string; // Materials
    strength(): string;
    size(): { length: number; width: number; height: number };
    crash(): string;
  }

  interface Tire {
    brand: string;
    purpose: string;
    count: number;
    role(): void;
    pause(): void;
  }

  type Materials = "stainless" | "steel" | "aluminium";
  type TirePurpose = "winter" | "summer" | "for season";

  class GDI implements Engine {
    constructor(private hp: number, private torque: number) {}

    pressure = "strong";

    private heating = () => {
      console.log("heating ...♨");
    };

    private cooling = () => {
      console.log("cooling ...❄️");
    };

    run = () => {
      this.heating();
      console.log("engine is working with ", this.hp, this.torque);
      console.log("use power ", this.pressure);
      return true;
    };

    stop = () => {
      this.cooling();
      console.log("engine is stopping");
      console.log("power to zero ");
      return false;
    };
  }

  class MPI implements Engine {
    constructor(private hp: number, private torque: number) {}

    pressure = "weak";

    private heating = () => {
      console.log("heating ...♨");
    };

    private cooling = () => {
      console.log("cooling ...❄️");
    };

    run = () => {
      this.heating();
      console.log("engine working with ", this.hp, this.torque);
      console.log("use power ", this.pressure);
      return true;
    };

    stop = () => {
      this.cooling();
      console.log("engine is stopping");
      console.log("power to zero ");
      return false;
    };
  }

  class CVT implements Mission {
    mode = "";
    constructor(private gear: number, mode: "manual" | "auto") {
      this.mode = mode;
    }

    clutch = () => {
      console.log("press clutch!! ䷮");
    };

    change = (nextGear: number) => {
      if (nextGear > this.gear) return this.gear;
      if (nextGear <= 0) return this.gear;

      this.clutch();

      this.gear = nextGear;
      return this.gear;
    };

    getGear = () => {
      return this.gear;
    };
  }

  class BodyOnFrame implements Frame {
    constructor(
      private length: number,
      private width: number,
      private height: number
    ) {}

    material = "steel";

    strength = () => {
      return "hard";
    };

    size = () => {
      return {
        length: this.length,
        width: this.width,
        height: this.height,
      };
    };

    crash = () => {
      const strength = this.strength();
      switch (strength) {
        case "weak":
          return "die";
        case "hard":
          return "safe";
        default:
          return "injury";
      }
    };
  }

  class UniBodyFrame implements Frame {
    constructor(
      private length: number,
      private width: number,
      private height: number
    ) {}

    material = "aluminum";

    strength = () => {
      return "normal";
    };

    size = () => {
      return {
        length: this.length,
        width: this.width,
        height: this.height,
      };
    };

    crash = () => {
      const strength = this.strength();
      switch (strength) {
        case "weak":
          return "die";
        case "hard":
          return "safe";
        default:
          return "injury";
      }
    };
  }

  // 작업중
  class FourSeasonTire implements Tire {
    brand = "";
    purpose = "";
    count = 0;
    characters = [];

    constructor(brand: string, purpose: string, count: number) {
      this.brand = brand;
      this.purpose = purpose;
      this.count = count;
    }

    role = () => {
      console.log("rolling ...🚗");
    };

    pause = () => {
      console.log("pause with break ...🛑");
    };
  }

  class SummerTire implements Tire {
    brand = "";
    purpose = "";
    count = 0;

    constructor(
      brand: string,
      purpose: string,
      count: number,
      private characters?: Array<string>
    ) {
      this.brand = brand;
      this.purpose = purpose;
      this.count = count;
    }

    role = () => {
      console.log("rolling ...🚗");
    };

    pause = () => {
      console.log("pause with break ...🛑");
    };
  }

  class Car {
    constructor(
      private tire: Tire,
      private frame: Frame,
      private engine: Engine,
      private mission: Mission,
      private name: string
    ) {}

    turnOn = () => {
    console.log('Hi, myname is ', this.name);
      this.engine.run();
    };

    turnOff = () => {
      this.engine.stop();
    };

    start = () => {
      if (this.mission.mode === "manual" && this.mission.getGear() <= 0) {
        console.log("please, change the gear");
      } else {
          console.log("car is starting ~~ 🚗");
        this.tire.role();
      }
    };

    stop = () => {
      if (this.mission.mode === "manual" && this.mission.getGear() > 0) {
        this.mission.clutch();
        this.mission.change(0);
      }

      console.log("car is stopping ~~ 🚗");
      this.tire.pause();
    };
  }

  // make car !
  // tires
  const normalTires = new FourSeasonTire("Nexen", "four season", 4);
  const summerTires = new SummerTire("Kumho", "summer", 4);
  // engine
  const gdi = new GDI(320, 52);
  const mpi = new MPI(180, 23);
  // mission
  const cvt4 = new CVT(6, "auto");
  const cvt16 = new CVT(12, "auto");
  // frame
  const unibody = new UniBodyFrame(4950, 1900, 1720);
  const bodyon = new BodyOnFrame(4920, 1870, 1700);

  const sonata = new Car(normalTires, bodyon, mpi, cvt4, "sonata");
  const stinger = new Car(summerTires, unibody, gdi, cvt16, "stinger");

  sonata.turnOn();
  sonata.start();
  console.log('---------------')
  stinger.turnOn();
  stinger.start();
}
