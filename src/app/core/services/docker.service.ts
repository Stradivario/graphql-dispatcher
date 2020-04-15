import { Injectable } from '@gapi/core';
import { homedir } from 'os';

import { Chmod, Docker, MakeDir } from '../../core/helpers';
import { flattenToArray } from '../../flatten';

export interface StartDocker {
  folder: string;
  password: string;
  ports: string[];
  force: boolean;
}

@Injectable()
export class DockerService {
  async start(
    { folder, force, password, ports }: StartDocker = {} as StartDocker,
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
    await Chmod(['-R', '755', projectFolder]);

    return Docker([
      'run',
      '--restart=always',
      '--name',
      name || 'my-vs-code',
      '-e',
      `PASSWORD=${password}`,
      ...dockerPorts,
      '-v',
      `${projectFolder}:/home/coder/project`,
      '-d',
      'rxdi/vs-code',
      '--allow-http',
    ]);
  }

  ps() {
    return Docker(['ps']);
  }

  rm(specifier: string) {
    return Docker(['rm', '-f', specifier]);
  }
}
