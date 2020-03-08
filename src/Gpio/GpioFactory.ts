import { ConsoleGpio } from "./ConsoleGpio";
import { IGpio } from "./IGpio";
import { RaspberryGpio } from "./RaspberryGpio";
import { Environment } from "../Environment.Pi";
import { GpioMode } from "./GpioMode";

export const GpioFactory = {
  create: (pin: number, mode: GpioMode, useConsole: boolean = false): IGpio => {

    if (Environment.isPi() && !useConsole) {
      return new RaspberryGpio(pin, mode);
    } else {
      return new ConsoleGpio(pin);
    }

  }
};
