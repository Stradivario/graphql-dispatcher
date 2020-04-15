import { CoreModule as GapiCoreModule, Module } from '@gapi/core';

import { AppController } from './app.controller';
import { CoreModule } from './core/core.moduile';

@Module({
  imports: [
    GapiCoreModule.forRoot({
      server: {
        hapi: {
          port: 42042,
        },
      },
      graphql: {
        openBrowser: false,
      },
    }),
    CoreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
