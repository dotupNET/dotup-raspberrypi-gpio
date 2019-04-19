import { sleep } from 'dotup-ts-types';
import { IGpio } from '../Gpio/IGpio';
import { ILamp } from './ILamp';
import { LampResponsibility } from './LampResponsibility';

export class Lamp implements ILamp {
  readonly responsibility: LampResponsibility;
  private readonly gpioDriver: IGpio;

  constructor(gpioDriver: IGpio, responsibility: LampResponsibility) {
    this.gpioDriver = gpioDriver;
    this.responsibility = responsibility;
  }

  async powerOnMs(durationMs: number): Promise<void> {
    await this.gpioDriver.on(durationMs);
  }

  async blink(count: number, intervalMs: number): Promise<void> {
    for (let index = 0; index < count; index += 1) {
      await this.gpioDriver.on();
      await sleep(intervalMs);
      await this.gpioDriver.off();
      await sleep(intervalMs);
    }
  }

  async powerOff(): Promise<void> {
    await this.gpioDriver.off();
  }

  async powerOn(): Promise<void> {
    await this.gpioDriver.on();
  }

  dispose(): void {
    this.gpioDriver.dispose();
  }

}

//   initialize(): void {

//   }

//   Responsibility: LampResponsibility;

//   FlushAsync(duration: number): Promise<void>;

//   FlushAsync(count: number, interval: number): Promise<void>;

//   Flush(duration: number): void;

//   Flush(count: number, interval: number): void;

//   PowerOn(): void;

//   PowerOff(): void;
// }
