import fs from 'fs';
import { ConsoleGpio } from './ConsoleGpio';
import { IGpio } from './IGpio';
import { RaspberryGpio } from './RaspberryGpio';
import { Environment } from '../Environment.Pi';

export namespace GpioFactory {
  export function create(pin: number, useConsole: boolean = false): IGpio {

    if (Environment.isPi() && !useConsole) {
      return new RaspberryGpio(pin);
    } else {
      return new ConsoleGpio(pin);
    }

  }

}
