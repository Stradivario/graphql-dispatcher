/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  GraphQLControllerOptions,
  GraphQLNonNull,
  GraphQLString,
  Mutation,
  Query,
} from '@gapi/core';
import { subscribeToTopic } from '@gapi/core';
import { WebSocketLink } from 'apollo-link-ws';
import { gql } from 'apollo-server-core';
import { createHash } from 'crypto';
import { networkInterfaces } from 'os';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const webSocketImpl = require('ws');
import { GenericCommandType } from '../app.types';
import { ISubscription } from '../core/introspection/graphql-server';
import { DockerService } from '../core/services/docker.service';
import { InstanceCommands, InstanceCommandsEnum } from './commands';

const machineHash = createHash('md5')
  .update(JSON.stringify(networkInterfaces()))
  .digest('base64');

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class PubsubController {
  private subscription: Subscription;

  constructor(private docker: DockerService) {}

  @Mutation({
    uri: {
      type: GraphQLNonNull(GraphQLString),
    },
  })
  subscribeToGraphqlPubsub(root, { uri }) {
    this.unsubscribe();
    this.subscription = subscribeToTopic<{
      data: ISubscription;
    }>(
      gql`
        subscription($machineHash: String!) {
          registerInstance(machineHash: $machineHash) {
            command
            args
          }
        }
      `,
      {
        machineHash,
      },
      new WebSocketLink({
        uri,
        options: {
          connectionParams: {
            authorization: 'omg',
            machineHash,
            networkInterfaces: JSON.stringify(networkInterfaces()),
          },
          reconnect: true,
        },
        webSocketImpl,
      }),
    )
      .pipe(map(({ data }) => data.registerInstance))
      .subscribe(async ({ args, command }) => {
        const cmd = InstanceCommandsEnum[command];
        if (!cmd) {
          throw new Error('Missing command');
        }
        return InstanceCommands[cmd](JSON.parse(args));
      }, console.error);
    return {};
  }

  @Mutation()
  unsubscribeToGraphqlPubsub() {
    this.unsubscribe();
    return {};
  }

  @Query({
    identifier: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  async inspectDocker(root, { identifier }) {
    return this.docker.inspect(identifier);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
