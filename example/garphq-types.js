import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

export const NestedType = new GraphQLObjectType({
  name: 'BlackBoxes',
  description: '',
  fields: () => ({
    color: {
      type: GraphQLString,
      description: 'I\'m the color of the nested object.'
    },
    description: {
      type: GraphQLString,
      description: 'I\'m the description of the nested object.'
    }
  })
});

export const BlackBoxType = new GraphQLObjectType({
  name: 'BlackBoxes',
  description: '',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'I\'m the id number of the black box.'
    },
    name: {
      type: GraphQLString,
      description: 'I\'m the name of the black box.'
    },
    description: {
      type: GraphQLString
    },
    nestedExample: {
      type: NestedType,
      description: 'I\'m a nested object type'
    },
    listExample: {
      type: new GraphQLList(GraphQLString),
      description: 'I\'m a list with string'
    },
    listWithNestedObjectExample: {
      type: new GraphQLList(NestedType),
      description: 'I\'m a list with nested object type'
    }
  })
});
