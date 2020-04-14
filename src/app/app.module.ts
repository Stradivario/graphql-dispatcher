import { CoreModule as GapiCoreModule, Module } from '@gapi/core';

import { CoreModule } from './core/core.moduile';

@Module({
  imports: [GapiCoreModule.forRoot(), CoreModule],
})
export class AppModule {}
