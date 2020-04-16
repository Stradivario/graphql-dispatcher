import { Injectable } from '@gapi/core';
import chalk from 'chalk';

import { Runner } from './runners.enum';
import { NpmRunner, YarnRunner } from './types';

@Injectable()
export class RunnerFactory {
  create(runner: Runner) {
    switch (runner) {
      case Runner.NPM:
        return new NpmRunner();

      case Runner.YARN:
        return new YarnRunner();

      default:
        return console.info(
          chalk.yellow(`[WARN] Unsupported runner: ${runner}`),
        );
    }
  }
}
