import fs from 'fs';
import * as os from 'os';

export namespace Environment {

  export function isPi(): boolean {
    try {
      const cpuInfo = fs.readFileSync('/proc/device-tree/model', { encoding: 'utf8' });

      return cpuInfo
        .trim()
        .toUpperCase()
        .startsWith('RASPBERRY');

    } catch (error) {
      return false;
    }
  }

  // export function isPiCpu(): boolean {
  //   try {

  export function getHostname(): string {
    return os.hostname();
  }

  //     const cpuInfo = fs.readFileSync('/proc/cpuinfo', { encoding: 'utf8' });

  //     const hardware = cpuInfo
  //       .split('\n')
  //       .filter(line => line
  //         .toLowerCase()
  //         .startsWith('Hardware'))
  //       .map(line => line.split(':'))
  //       .map(line => line[2].trim())
  //       .reduce((p, c) => c)
  //       ;

  //     if (hardware === undefined || !hardware.startsWith('BCM')) {
  //       return false;
  //     }

  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

}
