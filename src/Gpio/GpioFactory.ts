import fs from 'fs';
import { ConsoleGpio } from './ConsoleGpio';
import { IGpio } from './IGpio';
import { RaspberryGpio } from './RaspberryGpio';
import { Environment } from '../Environment.Pi';
import { BinaryValue } from 'onoff';

export namespace GpioFactory {
  export function create(pin: number, activeLow: boolean, useConsole: boolean = false): IGpio {

    if (Environment.isPi() && !useConsole) {
      return new RaspberryGpio(pin, activeLow);
    } else {
      return new ConsoleGpio(pin);
    }

  }

}
