import {
  Controller,
  GraphQLControllerOptions,
  GraphQLNonNull,
  GraphQLString,
  Mutation,
} from '@gapi/core';
import { subscribeToTopic } from '@gapi/core';
import { WebSocketLink } from 'apollo-link-ws';
import { gql } from 'apollo-server-core';
import { createHash } from 'crypto';
import { hostname, networkInterfaces } from 'os';
import { Subscription } from 'rxjs';
import webSocketImpl from 'ws';

import { GenericCommandType } from '../app.types';

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class PubsubController {
  private subscription: Subscription;

  @Mutation({
    uri: {
      type: GraphQLNonNull(GraphQLString),
    },
  })
  subscribeToGraphqlPubsub(root, { uri }) {
    this.subscription = subscribeToTopic<{
      data: { registerInstance: { command: string } };
    }>(
      gql`
        subscription($machineHash: String!, $networkInterfaces: String!) {
          registerInstance(
            machineHash: $machineHash
            networkInterfaces: $networkInterfaces
          ) {
            command
          }
        }
      `,
      {
        machineHash: createHash('md5').update(hostname()).digest('base64'),
        networkInterfaces: JSON.stringify(networkInterfaces()),
      },
      new WebSocketLink({
        uri,
        options: {
          reconnect: true,
        },
        webSocketImpl,
      }),
    ).subscribe((stream) => {
      console.log(stream.data.registerInstance.command);
    }, console.error);
    return {};
  }

  @Mutation()
  unsubscribeToGraphqlPubsub() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    return {};
  }
}
