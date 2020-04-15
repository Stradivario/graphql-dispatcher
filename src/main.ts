import { Bootstrap, Container, HAPI_SERVER } from '@gapi/core';
import { Server } from 'hapi';

import { AppModule } from './app/app.module';

Bootstrap(AppModule).subscribe(() =>
  console.log(
    'SIGNAL_MAIN_API_STARTED',
    `Running at http://${Container.get<Server>(HAPI_SERVER).info.address}/${
      Container.get<Server>(HAPI_SERVER).info.port
    }`,
  ),
);
