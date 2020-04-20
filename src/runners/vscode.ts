import { homedir } from 'os';

import { flattenToArray } from '../helpers/flatten';
import { Chmod, Docker, MakeDir } from '.';

export interface StartDockerArguments {
  specifier: string;
  folder: string;
  password: string;
  ports: string[];
  force?: boolean;
  image?: string;
}

export function StopVsCode(specifier: string) {
  return Docker(['rm', '-f', specifier]);
}

export async function StartVsCode(
  {
    folder,
    force,
    password,
    ports,
    specifier,
    image,
  }: StartDockerArguments = {} as StartDockerArguments,
) {
  const dockerPorts: string[] = flattenToArray(
    ports.map((p: string) => ['-p', p]) as never,
  );
  const projectFolder = `${homedir()}/${folder}`;
  if (!force) {
    try {
      await MakeDir([projectFolder]);
    } catch (e) {
      throw new Error(
        `There is a project folder with name ${folder} inside home directory. Consider checking if there is a running vs-code instance or you may want to use force option`,
      );
    }
  }
  await Chmod(['-R', '777', projectFolder]);

  return Docker([
    'run',
    '--restart=always',
    '--name',
    specifier || 'my-vs-code',
    '-e',
    `PASSWORD=${password}`,
    ...dockerPorts,
    '-v',
    `${projectFolder}:/home/coder/project`,
    '-d',
    image || 'rxdi/vs-code',
    '--allow-http',
  ]);
}
