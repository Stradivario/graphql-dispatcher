import { Module } from '@gapi/core';

import { DockerService } from './services/docker.service';
import { RequestProvider } from './services/send-request';

@Module({
  providers: [RequestProvider, DockerService],
})
export class CoreModule {}
