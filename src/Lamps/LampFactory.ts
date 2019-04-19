import { platform } from 'os';
import { ILamp } from './ILamp';
import { Lamp } from './Lamp';
import { GpioFactory } from '../Gpio/GpioFactory';
import { LampResponsibility } from './LampResponsibility';

export namespace LampFactory {

  export function create(pin: number, lampResponsibility: LampResponsibility, useConsole: boolean = false): ILamp {
    const driver = GpioFactory.create(pin, useConsole);

    return new Lamp(driver, lampResponsibility);
  }

}
