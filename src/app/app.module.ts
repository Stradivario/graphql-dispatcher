import { Module } from '@gapi/core';

import { AppController } from './app.controller';
import { AppFrameModule } from './app.frame';
import { CoreModule } from './core/core.moduile';

@Module({
  imports: [AppFrameModule.forRoot(process.env.API_PORT || 42042), CoreModule],
  controllers: [AppController],
})
export class AppModule {}
