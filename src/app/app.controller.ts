import { Controller, GraphQLControllerOptions, Query } from '@gapi/core';
import { spawn } from 'child_process';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { homedir } from 'os';

import { flattenToArray } from './flatten';

export const executeCommand = (command: string, args: string[] = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    let data = '';
    let error = '';
    child.stderr.on('data', (out) => (error += out));
    child.stdout.on('data', (out) => {
      data += out.toString();
    });
    child.on('close', (code: number) => {
      if (code !== 0) {
        reject({ code, error });
      } else {
        resolve({ data, code });
      }
    });
  });
};
export const Docker = (args: string[] = []) => {
  return executeCommand('docker', args);
};

export const MakeDir = (args: string[] = []) => {
  return executeCommand('mkdir', args);
};

export const Chmod = (args: string[] = []) => {
  return executeCommand('chmod', args);
};

export const GenericCommandType = new GraphQLObjectType({
  name: 'GenericCommandType',
  fields: {
    code: {
      type: GraphQLInt,
    },
    data: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLString,
    },
  },
});

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class AppController {
  stoppedListener: NodeJS.Timeout;
  @Query()
  stopDocker() {
    return Docker(['ps']);
  }

  @Query({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    folder: {
      type: new GraphQLNonNull(GraphQLString),
    },
    ports: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
    force: {
      type: GraphQLBoolean,
    },
  })
  async startDocker(
    root,
    {
      name,
      ports,
      password,
      folder,
      force,
    }: {
      ports: string[];
      name: string;
      password: string;
      folder: string;
      force: boolean;
    },
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

  @Query()
  psDocker() {
    return Docker(['ps']);
  }

  @Query({
    imageId: {
      type: GraphQLString,
    },
  })
  rmDocker(root, { imageId }) {
    return Docker(['rm', '-f', imageId]);
  }

  @Query()
  destroyServer() {
    if (this.stoppedListener) {
      clearTimeout(this.stoppedListener);
      this.stoppedListener = null;
    }
    this.stoppedListener = setTimeout(() => process.exit(0), 5000);
    return {
      data: 'Server will stop in 2 seconds',
    };
  }
}
