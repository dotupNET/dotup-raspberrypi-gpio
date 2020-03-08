import { IDisposable } from "@dotup/dotup-ts-types";

export interface IGpio extends IDisposable {
  PinNo: number;
  on(): Promise<void>;
  // tslint:disable-next-line: unified-signatures
  on(durationMs: number): Promise<void>;
  off(): Promise<void>;
  read(): Promise<boolean>;
  set(value: number): Promise<void>;
}
