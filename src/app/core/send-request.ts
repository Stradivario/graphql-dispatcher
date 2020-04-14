import { Injectable } from '@gapi/core';
import { createApolloFetch } from 'apollo-fetch';
import { FetchResult } from 'apollo-link';

@Injectable()
export class RequestProvider {
  // constructor() {
  //   this.sendRequest<any, { key: 'dada' }>(
  //     {
  //       query: `
  //               query status {
  //                 status {
  //                   status
  //                 }
  //               }
  //               `,
  //       variables: { key: 'dada' },
  //     },
  //     'http://localhost:9000/graphql',
  //   ).then((data) => console.log(data));
  // }
  async sendRequest<T, V = {}>(
    {
      variables,
      query,
      token,
    }: { variables?: V; query: string; token?: string },
    uri: string,
  ): Promise<FetchResult<T>> {
    const fetch = createApolloFetch({
      uri,
    });
    fetch.use(({ options }, next) => {
      if (!options.headers) {
        options.headers = {}; // Create the headers object if needed.
      }
      options.headers['authorization'] = token;
      next();
    });
    return fetch({
      query,
      variables,
    } as never);
  }
}
