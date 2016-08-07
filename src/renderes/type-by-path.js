import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql'

export function typeByPath(gqlType, path) {
  if(!path) {
    return  gqlType.type ? gqlType.type : gqlType;
  }

  const arr = path.split('.');

  return _.reduce(arr, function(parent, keyName) {

    let parentType = parent.type || parent;
    if(!parentType) {
      throw 'gqlType must be GraphQL Type'
    }

    if(!keyName) {
      return parentType;
    }


    switch (parentType.constructor) {
      case GraphQLObjectType:
        return parentType.getFields()[keyName].type;
        break;
      case GraphQLList:
        return parentType.ofType;
        break;
    }
  }, gqlType);
}
