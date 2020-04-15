import {
  Controller,
  GraphQLControllerOptions,
  GraphQLNonNull,
  GraphQLString,
  Mutation,
} from '@gapi/core';
import { Container, subscribeToTopic } from '@gapi/core';
import { WebSocketLink } from 'apollo-link-ws';
import { gql } from 'apollo-server-core';
import { createHash } from 'crypto';
import { hostname, networkInterfaces } from 'os';
import { Subscription } from 'rxjs';
import ws from 'ws';

import { GenericCommandType } from './app.types';

const createWebsocketLink = (
  options = { uri: 'ws://localhost:9000/subscriptions' },
) => {
  if (!Container.has(WebSocketLink)) {
    console.log(ws);
    Container.set(
      WebSocketLink,
      new WebSocketLink({
        uri: options.uri,
        options: {
          reconnect: true,
        },
        webSocketImpl: ws,
      }),
    );
  }
  return Container.get(WebSocketLink);
};

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: GenericCommandType,
})
export class AppPubsubController {
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
      createWebsocketLink({ uri }),
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
