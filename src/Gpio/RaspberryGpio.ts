import { sleep } from 'dotup-ts-types';
import { Gpio, BinaryValue } from 'onoff';
import { IGpio } from './IGpio';

export class RaspberryGpio implements IGpio {
  private readonly gpio: Gpio;
  readonly pin: number;
  readonly onValue: BinaryValue;
  readonly offValue: BinaryValue;

  constructor(pin: number, onValue: BinaryValue) {
    this.onValue = onValue;
    this.offValue = onValue === 1 ? 0 : 1;
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
    await this.gpio.write(this.offValue);
  }

  async set(value: number): Promise<void> {
    if (value === this.offValue) {
      await this.gpio.write(this.onValue);
    } else {
      await this.gpio.write(this.offValue);
    }
  }

  async read(): Promise<boolean> {
    const result = await this.gpio.read();
    return result === this.onValue;
  }

  dispose(): void {
    this.gpio.unexport();
  }

}
