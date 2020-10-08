import { Controller, GraphQLControllerOptions, Query } from '@gapi/core';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { StartDockerArguments } from './runners/vscode';
import { StartVsCode, StopVsCode } from './runners/vscode';

export const GenericCommandType = new GraphQLObjectType({
  name: 'GenericCommand',
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
    image: {
      type: GraphQLString,
    },
  })
  startVsCode(root, args: StartDockerArguments) {
    return StartVsCode(args);
  }

  @Query({
    specifier: {
      type: GraphQLString,
    },
  })
  stopVsCode(root, { specifier }) {
    return StopVsCode(specifier);
  }
}
