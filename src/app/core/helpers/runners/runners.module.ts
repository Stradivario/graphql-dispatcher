import { Module } from '@gapi/core';

import { RunnerFactory } from './runner.factory';

@Module({
  providers: [RunnerFactory],
})
export class RunnersModule {}
