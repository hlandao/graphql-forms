import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull
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
      case GraphQLInputObjectType:
      case GraphQLObjectType:
        return parentType.getFields()[keyName].type;
        break;
      case GraphQLList:
        return parentType.ofType;
        break;
      case GraphQLNonNull:
        return parentType.ofType;
        break;
    }
  }, gqlType);
}

export function fieldByPath(gqlType, path) {
  if(!path) {
    return  gqlType.type ? gqlType.type : gqlType;
  }

  const arr = path.split('.');

  // We don't want to return "field" for the embedded list ofType;
  if(arr[arr.length - 1] == 'ofType') return null;

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
      case GraphQLInputObjectType:
        return parentType.getFields()[keyName];
        break;
      case GraphQLList:
        return parentType.ofType;
        break;
      case GraphQLNonNull:
        return parentType.ofType;
        break;
    }
  }, gqlType);
}
