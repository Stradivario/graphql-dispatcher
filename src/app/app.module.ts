import { CoreModule as GapiCoreModule, Module } from '@gapi/core';

import { AppController } from './app.controller';
import { AppPubsubController } from './app.pubsub.controller';
import { CoreModule } from './core/core.moduile';

@Module({
  imports: [
    GapiCoreModule.forRoot({
      server: {
        hapi: {
          port: process.env.API_PORT || 42042,
        },
      },
      graphql: {
        openBrowser: false,
      },
    }),
    CoreModule,
  ],
  controllers: [AppController, AppPubsubController],
})
export class AppModule {}
