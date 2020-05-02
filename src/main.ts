import {
  Bootstrap,
  CLIBuilder,
  Environment,
  executeCommand,
  machineHash,
  ProcessReturn,
} from '@gapi/cli-builder';
import { Module } from '@gapi/core';
import { gql } from 'apollo-server-core';
import { homedir } from 'os';

import { AppController } from './app.controller';
import {
  StartDockerArguments,
  StartVsCode,
  StopVsCode,
} from './runners/vscode';

export enum Commands {
  START_VS_CODE = 1,
  STOP_VS_CODE = 2,
  CLONE_PROJECT = 3,
  REMOVE_PROJECT = 4,
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
        CLONE_PROJECT: async ({
          folder,
          repo,
        }: {
          folder: string;
          repo: string;
        }) => {
          console.log('[CLONE_PROJECT]: started arguments: ', repo, folder);
          const data = await executeCommand('git', ['clone', repo, folder], {
            cwd: homedir(),
          });
          console.log('[CLONE_PROJECT]: exited');
          return data;
        },
        REMOVE_PROJECT: async ({ folder }: { folder: string }) => {
          const projectFolder = `${homedir()}/${folder}`;
          console.log('[REMOVE_PROJECT]: started arguments: ', folder);
          const data = await executeCommand('rm', ['-rf', projectFolder]);
          console.log('[REMOVE_PROJECT]: exited');
          return data;
        },
      },
      Commands,
      {
        subscription: {
          query: gql`
            subscription($machineHash: String!, $label: String!) {
              registerInstance(machineHash: $machineHash, label: $label) {
                command
                args
                cwd
              }
            }
          `,
          variables: {
            machineHash,
            label: Environment.GRAPHQL_RUNNER_LABEL,
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
  if (Environment.GRAPHQL_RUNNER_SUBSCRIPTION_URI) {
    console.log(
      'STARTED_SUBSCRIPTIONS:',
      Environment.GRAPHQL_RUNNER_SUBSCRIPTION_URI,
    );
  } else {
    console.log(
      'SIGNAL_MAIN_API_STARTED',
      `Running at http://localhost:${Environment.GRAPHQL_RUNNER_API_PORT}`,
    );
  }
});
