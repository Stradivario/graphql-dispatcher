import { CoreModule, Module, ModuleWithProviders } from '@gapi/core';

@Module()
export class AppFrameModule {
  public static forRoot(port: number | string): ModuleWithProviders {
    return {
      module: AppFrameModule,
      frameworkImports: [
        CoreModule.forRoot({
          server: {
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
