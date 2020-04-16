import { Module } from '@gapi/core';

import { AppFrameModule } from './app.frame';
import { CoreModule } from './core/core.moduile';
import { DockerModule } from './docker/docker.module';
import { PubSubModule } from './pubsub/pubsub.module';

@Module({
  imports: [
    AppFrameModule.forRoot(process.env.API_PORT || 42042),
    CoreModule,
    PubSubModule,
    DockerModule,
  ],
})
export class AppModule {}
