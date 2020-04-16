import { Controller, GraphQLControllerOptions, Query } from '@gapi/core';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { GenericCommandType } from '../app.types';
import {
  DockerService,
  StartDockerArguments,
} from '../core/services/docker.service';

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class DockerController {
  stoppedListener: NodeJS.Timeout;

  constructor(private docker: DockerService) {}

  @Query({
    specifier: {
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
  async startDocker(root, args: StartDockerArguments) {
    return this.docker.start(args);
  }

  @Query()
  psDocker() {
    return this.docker.ps();
  }

  @Query({
    specifier: {
      type: GraphQLString,
    },
  })
  rmDocker(root, { specifier }) {
    return this.docker.rm(specifier);
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
