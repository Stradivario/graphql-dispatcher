import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
export const RGBType = new GraphQLEnumType({
  name: 'RGB',
  values: {
    RED: { value: 0 },
    GREEN: { value: 1 },
    BLUE: { value: 2 },
  },
});
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
    test: {
      type: RGBType,
    },
  },
});
