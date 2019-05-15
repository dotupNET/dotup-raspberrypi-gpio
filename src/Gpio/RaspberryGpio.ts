import { sleep } from 'dotup-ts-types';
import { Gpio, BinaryValue } from 'onoff';
import { IGpio } from './IGpio';

export class RaspberryGpio implements IGpio {
  private readonly gpio: Gpio;
  readonly pin: number;

  constructor(pin: number, activeLow: boolean) {
    this.pin = pin;
    console.info(`RaspberryGpio: Pin ${pin} initialized`);
    this.gpio = new Gpio(pin, 'out', 'none', { activeLow: activeLow });
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
    await this.gpio.write(0);
  }

  async set(value: number): Promise<void> {
    await this.gpio.write(value === 0 ? 0 : 1);
  }

  async read(): Promise<boolean> {
    const result = await this.gpio.read();
    return result === 1;
  }

  dispose(): void {
    this.gpio.unexport();
  }

}
