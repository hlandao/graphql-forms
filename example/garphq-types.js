import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
} from 'graphql'

const ColorType = new GraphQLEnumType({
  name: 'Color',
  values: {
    RED: { value: 0 },
    GREEN: { value: 1 },
    BLUE: { value: 2 }
  }
});

export const NestedType = new GraphQLObjectType({
  name: 'BlackBoxes',
  description: '',
  fields: () => ({
    color: {
      type: ColorType,
      description: 'I\'m the color of the nested object. and I\'m enum'
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
      type: new GraphQLNonNull(GraphQLString),
      description: 'I\'m the name of the black box.'
    },
    description: {
      type: GraphQLString
    },
    nestedExample: {
      type: new GraphQLNonNull(NestedType),
      description: 'I\'m a nested object type'
    },
    listExample: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: 'I\'m a list with string'
    },
    listWithNestedObjectExample: {
      type: new GraphQLList(NestedType),
      description: 'I\'m a list with nested object type'
    }
  })
});
