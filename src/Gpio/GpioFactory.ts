import fs from 'fs';
import { ConsoleGpio } from './ConsoleGpio';
import { IGpio } from './IGpio';
import { RaspberryGpio } from './RaspberryGpio';
import { Environment } from '../Environment.Pi';
import { BinaryValue } from 'onoff';

export namespace GpioFactory {
  export function create(pin: number, useConsole: boolean = false, onValue: BinaryValue): IGpio {

    if (Environment.isPi() && !useConsole) {
      return new RaspberryGpio(pin, onValue);
    } else {
      return new ConsoleGpio(pin);
    }

  }

}
