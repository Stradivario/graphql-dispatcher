/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, subscribeToTopic, WebSocketLink } from '@gapi/core';
import { gql } from 'apollo-server-core';
import { createHash } from 'crypto';
import { networkInterfaces } from 'os';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { InstanceCommands, InstanceCommandsEnum } from '../../commands';
import { ISubscription } from '../introspection/graphql-server';

const webSocketImpl = require('ws');

const machineHash = createHash('md5')
  .update(JSON.stringify(networkInterfaces()))
  .digest('base64');

@Injectable()
export class SubscriptionService {
  subscription: Subscription;
  currentSubscriptionUri: string;
  subscribe(uri: string) {
    this.currentSubscriptionUri = uri;
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
        await InstanceCommands[cmd](JSON.parse(args));
      }, console.error);
    return this.subscription;
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
