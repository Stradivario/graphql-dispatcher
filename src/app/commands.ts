import { Container } from '@gapi/core';

import {
  DockerService,
  StartDockerArguments,
} from './core/services/docker.service';

export enum InstanceCommandsEnum {
  START_VS_CODE = 1,
  REMOVE_VS_CODE = 2,
}

export type GenericEnumType<T, K, A = {}> = {
  [key in keyof T]: (args: A) => K;
};
const dockerService = Container.get(DockerService);
export const InstanceCommands: GenericEnumType<
  typeof InstanceCommandsEnum,
  Promise<void | null>
> = {
  START_VS_CODE: async (args: StartDockerArguments) => {
    console.log('START_VS_CODE', args);
    await dockerService.start(args);
  },
  REMOVE_VS_CODE: async ({ specifier }: { specifier: string }) => {
    console.log('STOP_VS_CODE');
    await dockerService.rm(specifier);
  },
};
