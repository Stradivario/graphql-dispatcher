import { Module } from '@gapi/core';

import { DockerService } from './services/docker.service';
import { RequestProvider } from './services/send-request';
import { SubscriptionService } from './services/subscription.service';

@Module({
  providers: [RequestProvider, DockerService, SubscriptionService],
})
export class CoreModule {}
