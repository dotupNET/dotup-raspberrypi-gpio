import { createInterface, Interface } from 'readline';
import { GpioFactory } from './Gpio/GpioFactory';
import { IGpio } from './Gpio/IGpio';

export class Cli {

  rl: Interface;
  current: IGpio;

  constructor() {
  }

  async write(pin: number | string, value: number | string): Promise<void> {
    this.openGpio(pin);
    const p = typeof pin === 'string' ? Number(pin) : pin;
    let v = typeof value === 'string' ? Number(value) : value;
    // const gpio = GpioFactory.create(p);
    if (v === undefined) {
      const currentValue = await this.read(pin);
      v = currentValue === true ? 0 : 1;
    }
    await this.current.set(v);
  }

  async read(pin: number | string): Promise<boolean> {
    this.openGpio(pin);
    return await this.current.read();
  }

  openGpio(pin: number | string) {
    const p = typeof pin === 'string' ? Number(pin) : pin;

    if (this.current === undefined || this.current.pin !== p) {
      this.closeGpio();
      this.current = GpioFactory.create(p, false, 0);
    }
  }

  closeGpio() {
    if (this.current === undefined) {
      return;
    } else {
      this.current.dispose();
    }
  }

  initialize() {
    if (this.rl !== undefined) {
      return;
    }

    this.rl = createInterface({
      terminal: true,
      input: process.stdin,
      output: process.stdout,
      prompt: 'GPIO> '
    });

    this.rl.on('line', async line => {
      const input = line.split(' ');

      switch (input[0]) {
        case 'read':
        case 'r':
          const value = await this.read(input[1])
          console.log(`Pin ${input[0]} is ${value}`);
          break;

        case 'write':
        case 'w':
          await this.write(input[1], input[2]);
          const writeValue = await this.read(input[1])
          console.log(`Pin ${input[1]} is ${writeValue}`);
          break;

      }

      this.rl.prompt();
    });

    this.rl.on('close', () => {
      process.exit(0);
    });

    this.rl.prompt();

  }

}
