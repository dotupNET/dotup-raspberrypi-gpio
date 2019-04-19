import { ILamp } from './ILamp';
import { LampResponsibility } from './LampResponsibility';
import { IDisposable } from 'dotup-ts-types';

export class LampSet implements IDisposable {
  readonly lamps: ILamp[];

  constructor() {
    this.lamps = [];
  }

  addLamp(lamp: ILamp) {
    this.lamps.push(lamp);
  }

  async powerOnMs(lampResponsibility: LampResponsibility, durationMs: number): Promise<void> {
    const lamp = this.lamps.find(l => l.responsibility === lampResponsibility);
    await lamp.powerOnMs(durationMs);
  }

  async blink(lampResponsibility: LampResponsibility, count: number, intervalMs: number): Promise<void> {
    const lamp = this.lamps.find(l => l.responsibility === lampResponsibility);
    await lamp.blink(count, intervalMs);
  }

  async powerOff(lampResponsibility: LampResponsibility): Promise<void> {
    const lamp = this.lamps.find(l => l.responsibility === lampResponsibility);
    await lamp.powerOff();
  }

  async powerOn(lampResponsibility: LampResponsibility): Promise<void> {
    const lamp = this.lamps.find(l => l.responsibility === lampResponsibility);
    await lamp.powerOn();
  }

  async lampTest(durationMs: number): Promise<void> {
    const all = this.lamps.map(l => l.powerOnMs(durationMs));
    await Promise.all(all);
  }

  async readyToScan(): Promise<void> {
    const errorLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Error);
    const readyLamp = this.lamps.find(l => l.responsibility === LampResponsibility.ReadyToScan);
    const scanLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Scanned);

    const all = [
      errorLamp.powerOff(),
      readyLamp.powerOn(),
      scanLamp.powerOff()
    ];

    await Promise.all(all);
  }

  async notReadyToScan(): Promise<void> {
    const errorLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Error);
    const readyLamp = this.lamps.find(l => l.responsibility === LampResponsibility.ReadyToScan);
    const scanLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Scanned);

    const all = [
      errorLamp.powerOn(),
      readyLamp.powerOff(),
      scanLamp.powerOff()
    ];

    await Promise.all(all);
  }

  async appStart(): Promise<void> {
    const errorLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Error);
    const readyLamp = this.lamps.find(l => l.responsibility === LampResponsibility.ReadyToScan);
    const scanLamp = this.lamps.find(l => l.responsibility === LampResponsibility.Scanned);

    const all = [
      errorLamp.powerOnMs(1000),
      readyLamp.powerOnMs(1000),
      scanLamp.powerOnMs(1000)
    ];

    await Promise.all(all);
  }

  dispose(): void {
    this.lamps.forEach(l => l.dispose());
  }

}
