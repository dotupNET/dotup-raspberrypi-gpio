import { IDisposable } from 'dotup-ts-types';

export interface IGpio extends IDisposable {
  pin: number;
  on(): Promise<void>;
  // tslint:disable-next-line: unified-signatures
  on(durationMs: number): Promise<void>;
  off(): Promise<void>;
  read(): Promise<boolean>;
  set(value: number): Promise<void>;
}
