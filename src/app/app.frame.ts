import { CoreModule, Module, ModuleWithProviders } from '@gapi/core';

import { includes } from './app.constants';

@Module()
export class AppFrameModule {
  public static forRoot(port: number | string): ModuleWithProviders {
    return {
      module: AppFrameModule,
      frameworkImports: [
        CoreModule.forRoot({
          server: {
            randomPort: includes('--random-port'),
            hapi: {
              port,
            },
          },
          graphql: {
            openBrowser: false,
          },
        }),
      ],
    };
  }
}
