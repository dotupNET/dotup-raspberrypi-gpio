import { sleep } from 'dotup-ts-types';
import { Gpio } from 'onoff';
import { IGpio } from './IGpio';

export class RaspberryGpio implements IGpio {
  private readonly gpio: Gpio;
  readonly pin: number;

  constructor(pin: number) {
    this.pin = pin;
    console.info(`RaspberryGpio: Pin ${pin} initialized`);
    this.gpio = new Gpio(pin, 'out');
  }

  async on(): Promise<void>;
  // tslint:disable-next-line: unified-signatures
  async on(durationMs: number): Promise<void>;
  async on(durationMs?: number): Promise<void> {
    await this.gpio.write(1);
    if (durationMs !== undefined) {
      await sleep(durationMs);
      await this.off();
    }
  }

  async off(): Promise<void> {
    await this.gpio.write(1);
  }

  async set(value: number): Promise<void> {
    if (value === 0) {
      await this.gpio.write(0);
    } else {
      await this.gpio.write(1);
    }
  }

  async read(): Promise<boolean> {
    const result = await this.gpio.read();
    return result === 1;
  }

  dispose(): void {
    this.gpio.unexport();
  }

}
