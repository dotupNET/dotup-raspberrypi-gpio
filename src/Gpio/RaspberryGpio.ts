import { sleep } from "@dotup/dotup-ts-types";
import { IGpio } from "./IGpio";
import { GpioMode } from "./GpioMode";
import { Environment } from "../Environment.Pi";
import { Ab } from "./IGpioFake";
// import { Gpio } from "./GpioFake";
import { Gpio as pigpio } from "pigpio";
import { GpioPullMode } from "./GpioPullMode";

const PIN_ON = 0;
const PIN_OFF = 1;

const Gpio: Ab = Environment.isPi() ?
  require("pigpio").Gpio :
  require("./GpioFake")
  ;

export class RaspberryGpio implements IGpio {
  // private readonly gpio: Rpio.
  readonly PinNo: number;
  gpio: Ab;

  constructor(pin: number, mode: GpioMode, pullMode: GpioPullMode = GpioPullMode.PUD_OFF) {
    this.PinNo = pin;

    console.info(`RaspberryGpio: Pin ${pin} initialized`);
    this.gpio = new Gpio(pin, {
      mode: mode,
      pullUpDown: pullMode,
    });
  }

  async on(): Promise<void>;
  // tslint:disable-next-line: unified-signatures
  async on(durationMs: number): Promise<void>;
  async on(durationMs?: number): Promise<void> {
    await this.gpio.digitalWrite(PIN_ON);
    if (durationMs !== undefined) {
      await sleep(durationMs);
      await this.off();
    }
  }

  async off(): Promise<void> {
    await this.gpio.digitalWrite(PIN_OFF);
  }

  async set(value: number): Promise<void> {
    await this.gpio.digitalWrite(value === PIN_OFF ? PIN_OFF : PIN_ON);
  }

  async read(): Promise<boolean> {
    const result = await this.gpio.digitalRead();
    return result === PIN_ON;
  }

  dispose(): void {
    console.info(`RaspberryGpio: Pin ${this.PinNo} disposed`);
  }

}
