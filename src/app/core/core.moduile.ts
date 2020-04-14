import { Module } from '@gapi/core';

import { RequestProvider } from './send-request';

@Module({
  providers: [RequestProvider],
})
export class CoreModule {}
