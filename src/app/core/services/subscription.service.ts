/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, subscribeToTopic, WebSocketLink } from '@gapi/core';
import { gql } from 'apollo-server-core';
import { createHash } from 'crypto';
import { networkInterfaces } from 'os';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { Environment } from '../../app.constants';
import { InstanceCommands, InstanceCommandsEnum } from '../../commands';
import { ISubscription } from '../introspection/graphql-server';

const webSocketImpl = require('ws');

const machineHash = createHash('md5')
  .update(JSON.stringify(networkInterfaces()))
  .digest('base64');

@Injectable({
  init: true,
})
export class SubscriptionService {
  subscription: Subscription;
  currentSubscriptionUri: string;
  link: WebSocketLink;
  constructor() {
    if (Environment.SUBSCRIPTION_URI) {
      this.subscribe(Environment.SUBSCRIPTION_URI, Environment.SECRET_KEY);
    }
  }
  subscribe(uri: string, authorization?: string) {
    this.unsubscribe();
    this.currentSubscriptionUri = uri;
    this.link = new WebSocketLink({
      uri,
      options: {
        connectionParams: {
          authorization,
          machineHash,
          worker_type: 'vscode',
          networkInterfaces: JSON.stringify(networkInterfaces()),
        },
        reconnect: true,
      },
      webSocketImpl,
    });
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
      this.link,
    )
      .pipe(map(({ data }) => data.registerInstance))
      .subscribe(async ({ args, command }) => {
        const cmd = InstanceCommandsEnum[command];
        if (!cmd) {
          throw new Error('Missing command');
        }
        await InstanceCommands[cmd](JSON.parse(args));
      }, console.error);
    return this.subscription;
  }

  unsubscribe() {
    if (this.link) {
      const subscriptionClient = this.link[
        'subscriptionClient'
      ] as SubscriptionClient;
      subscriptionClient.close();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
