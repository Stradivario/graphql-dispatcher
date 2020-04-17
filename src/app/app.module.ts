import { Module } from '@gapi/core';

import { Environment } from './app.constants';
import { AppController } from './app.controller';
import { AppFrameModule } from './app.frame';
import { CoreModule } from './core/core.moduile';

@Module({
  imports: [AppFrameModule.forRoot(Environment.API_PORT), CoreModule],
  controllers: Environment.SUBSCRIPTION_URI ? [] : [AppController],
})
export class AppModule {}
