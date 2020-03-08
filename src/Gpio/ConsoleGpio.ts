import { sleep } from "@dotup/dotup-ts-types";
import { IGpio } from "./IGpio";


export class ConsoleGpio implements IGpio {
  PinNo: number;
  value: boolean;
  constructor(pin: number) {
    this.PinNo = pin;
    console.info(`ConsoleGpio: Pin ${this.PinNo} initialized`);
  }

  async on(): Promise<void>;
  // tslint:disable-next-line: unified-signatures
  async on(durationMs: number): Promise<void>;
  async on(durationMs?: number): Promise<void> {
    this.value = true;
    if (durationMs === undefined) {
      console.log(`Pin ${this.PinNo} on`);
    } else {
      console.log(`Pin ${this.PinNo} on`);
      await sleep(durationMs);
      await this.off();
    }
  }

  async off(): Promise<void> {
    console.log(`Pin ${this.PinNo} off`);
    this.value = false;
  }

  async set(value: number): Promise<void> {
    if (value === 0) {
      await this.off();
    } else {
      await this.on();
    }
  }

  async read(): Promise<boolean> {
    return this.value;
  }

  dispose(): void {
    console.log(`Pin ${this.PinNo} disposed`);
  }

}
