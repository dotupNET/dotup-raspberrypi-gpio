import { createInterface, Interface } from "readline";
import { GpioFactory } from "./Gpio/GpioFactory";
import { IGpio } from "./Gpio/IGpio";
import { sleep } from "@dotup/dotup-ts-types";
import { GpioMode } from "./Gpio/GpioMode";

export class Cli {

  rl: Interface;
  current: IGpio;

  async write(pin: number | string, value: number | string): Promise<void> {
    this.openGpio(pin, GpioMode.OUTPUT);
    let v = typeof value === "string" ? Number(value) : value;
    // const gpio = GpioFactory.create(p);
    if (v === undefined) {
      const currentValue = await this.read(pin);
      v = currentValue === true ? 0 : 1;
    }
    await this.current.set(v);
  }

  async read(pin: number | string): Promise<boolean> {
    this.openGpio(pin, GpioMode.OUTPUT);
    return await this.current.read();
  }

  openGpio(pin: number | string, mode: GpioMode) {
    const p = typeof pin === "string" ? Number(pin) : pin;

    if (this.current === undefined || this.current.PinNo !== p) {
      this.closeGpio();
      this.current = GpioFactory.create(p, mode, false);
    }
  }

  closeGpio() {
    if (this.current === undefined) {
      return;
    } else {
      this.current.dispose();
    }
  }

  initialize() {
    if (this.rl !== undefined) {
      return;
    }

    this.rl = createInterface({
      terminal: true,
      input: process.stdin,
      output: process.stdout,
      prompt: "GPIO> "
    });

    this.rl.on("line", async line => {
      const input = line.split(" ");

      switch (input[0]) {
        case "read":
        case "r":
          const value = await this.read(input[1]);
          console.log(`Pin ${input[0]} is ${value}`);
          break;

        case "write":
        case "w":
          await this.write(input[1], input[2]);
          const writeValue = await this.read(input[1]);
          console.log(`Pin ${input[1]} is ${writeValue}`);
          break;

        case "duration":
        case "d":
          await this.write(input[1], 1);
          await sleep(Number(input[2]));
          await this.write(input[1], 0);
          // console.log(`Pin ${input[1]} is ${writeValue}`);
          break;

      }

      this.rl.prompt();
    });

    this.rl.on("close", () => {
      process.exit(0);
    });

    this.rl.prompt();

  }

}
