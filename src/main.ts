import { Bootstrap, Container, HAPI_SERVER } from '@gapi/core';
import { Server } from 'hapi';

import { Environment } from './app/app.constants';
import { AppModule } from './app/app.module';

Bootstrap(AppModule, {
  init: !Environment.SUBSCRIPTION_URI,
}).subscribe(() => {
  if (Environment.SUBSCRIPTION_URI) {
    console.log('STARTED_SUBSCRIPTIONS:', Environment.SUBSCRIPTION_URI);
  } else {
    console.log(
      'SIGNAL_MAIN_API_STARTED',
      `Running at http://localhost:${
        Container.get<Server>(HAPI_SERVER).info.port
      }`,
    );
  }
});
