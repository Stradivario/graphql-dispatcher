import { mkdirp } from '@rxdi/core/dist/services/file/dist';
import { homedir } from 'os';
import { promisify } from 'util';

import { flattenToArray } from '../helpers/flatten';
import { Chmod, Docker } from '.';

export interface StartDockerArguments {
  specifier: string;
  folder: string;
  password: string;
  ports: string[];
  image?: string;
}
const mkdir: (path: string, fn: (e) => void) => void = mkdirp;

export function StopVsCode(specifier: string) {
  return Docker(['rm', '-f', specifier]);
}

export async function StartVsCode(
  {
    folder,
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
  try {
    await promisify(mkdir)(projectFolder);
  } catch (e) {
    throw new Error(e);
  }
  await Chmod(['-R', '777', projectFolder]);
  // docker run -it -p 127.0.0.1:8080:8080 -v "$PWD:/home/coder/project"  -u "$(id -u):$(id -g)"  --env PASSWORD=4 rxdi/vs-code
  return Docker([
    'run',
    '--restart=always',
    '--name',
    specifier || 'my-vs-code',
    ...dockerPorts,
    '-v',
    `${projectFolder}:/home/coder/project`,
    '-d',
    '--env',
    `PASSWORD=${password}`,
    image || 'rxdi/vs-code:latest',
  ]);
}
