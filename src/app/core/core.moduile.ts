import { Module, SubscriptionService } from '@gapi/core';

import { DockerService } from './services/docker.service';
import { RequestProvider } from './services/send-request';

@Module({
  providers: [RequestProvider, DockerService, SubscriptionService],
})
export class CoreModule {}
