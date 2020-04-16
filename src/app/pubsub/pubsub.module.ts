import { Module } from '@gapi/core';

import { PubsubController } from './pubsub.controller';
@Module({
  controllers: [PubsubController],
})
export class PubSubModule {}
