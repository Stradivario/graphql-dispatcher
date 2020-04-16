/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  GraphQLControllerOptions,
  Mutation,
  Query,
} from '@gapi/core';
import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { GenericCommandType } from './app.types';
import {
  DockerService,
  StartDockerArguments,
} from './core/services/docker.service';
import { SubscriptionService } from './core/services/subscription.service';

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class AppController {
  stoppedListener: NodeJS.Timeout;

  constructor(
    private docker: DockerService,
    private subscriptionService: SubscriptionService,
  ) {}

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
    image: {
      type: GraphQLString,
    },
  })
  startVsCode(root, args: StartDockerArguments) {
    return this.docker.start(args);
  }

  @Query({
    specifier: {
      type: GraphQLString,
    },
  })
  removeVsCode(root, { specifier }) {
    return this.docker.rm(specifier);
  }

  @Query()
  listDockerContainers() {
    return this.docker.ps();
  }

  @Mutation({
    uri: {
      type: GraphQLNonNull(GraphQLString),
    },
  })
  subscribeToGraphqlPubsub(root, { uri }) {
    this.subscriptionService.unsubscribe();
    this.subscriptionService.subscribe(uri);
    return {
      data: `Success subscribed to pubsub ${uri}`,
    };
  }

  @Mutation()
  unsubscribeToGraphqlPubsub() {
    this.subscriptionService.unsubscribe();
    return {
      data: `Success unsubscribed from ${this.subscriptionService.currentSubscriptionUri}`,
    };
  }

  @Query({
    identifier: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  inspectDocker(root, { identifier }) {
    return this.docker.inspect(identifier);
  }
}
