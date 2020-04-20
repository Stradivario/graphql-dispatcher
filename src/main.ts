import {
  Bootstrap,
  CLIBuilder,
  Environment,
  machineHash,
  ProcessReturn,
} from '@gapi/cli-builder';
import { Module } from '@gapi/core';
import { gql } from 'apollo-server-core';

import { AppController } from './app.controller';
import {
  StartDockerArguments,
  StartVsCode,
  StopVsCode,
} from './runners/vscode';

export enum Commands {
  START_VS_CODE = 1,
  STOP_VS_CODE = 2,
}

@Module({
  imports: [
    CLIBuilder.forRoot<typeof Commands, Promise<ProcessReturn>>(
      {
        START_VS_CODE: async (args: StartDockerArguments) => {
          console.log('[RUN_GIT]: started arguments: ', args);
          const data = await StartVsCode(args);
          console.log('[RUN_GIT]: exited');
          return data;
        },
        STOP_VS_CODE: async ({ specifier }: { specifier: string }) => {
          console.log('[RUN_NPM]: started arguments: ', specifier);
          const data = await StopVsCode(specifier);
          console.log('[RUN_NPM]: exited');
          return data;
        },
      },
      Commands,
      {
        subscription: {
          query: gql`
            subscription($machineHash: String!) {
              registerInstance(machineHash: $machineHash) {
                command
                args
                cwd
              }
            }
          `,
          variables: {
            machineHash,
          },
          map: (i) => i.registerInstance,
        },
        status: {
          query: gql`
            mutation notifyMachineResult(
              $machineHash: String!
              $data: String!
              $error: String
            ) {
              notifyMachineResult(
                machineHash: $machineHash
                data: $data
                error: $error
              ) {
                status
              }
            }
          `,
        },
      },
    ),
  ],
  controllers: [AppController],
})
class AppModule {}

Bootstrap(AppModule).subscribe(() => {
  if (Environment.SUBSCRIPTION_URI) {
    console.log('STARTED_SUBSCRIPTIONS:', Environment.SUBSCRIPTION_URI);
  } else {
    console.log(
      'SIGNAL_MAIN_API_STARTED',
      `Running at http://localhost:${Environment.API_PORT}`,
    );
  }
});
