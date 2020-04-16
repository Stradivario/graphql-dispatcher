import { Module } from '@gapi/core';

import { DockerController } from './docker.controller';

@Module({
  controllers: [DockerController],
})
export class DockerModule {}
