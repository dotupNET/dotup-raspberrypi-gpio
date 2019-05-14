#!/usr/bin/env node
import commander from 'commander';
import { Cli } from './Cli';

const args = commander
  .option('-p, --pin <gpioPin>', 'GPIO PIN')
  .option('-w, --write <value>', 'Write gpio pin')
  .option('-r, --read', 'Read gpio pin')
  .parse(process.argv);

const cli = new Cli();

const pin = args.pin === undefined ? undefined : Number(args.pin);
const write = args.write === undefined ? undefined : Number(args.write);
const read = args.read === undefined ? false : true;

if (pin) {
  if (read) {
    cli.read(pin);
  } else if (write !== undefined) {
    cli.write(pin, write);
  } else {
    console.log('Invalid arguments');
  }
  process.exit(0);
} else {
  cli.initialize();
}
