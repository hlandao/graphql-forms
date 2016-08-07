'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeByPath = typeByPath;

var _graphql = require('graphql');

function typeByPath(gqlType, path) {
  if (!path) {
    return gqlType.type ? gqlType.type : gqlType;
  }

  var arr = path.split('.');

  return _.reduce(arr, function (parent, keyName) {

    var parentType = parent.type || parent;
    if (!parentType) {
      throw 'gqlType must be GraphQL Type';
    }

    if (!keyName) {
      return parentType;
    }

    switch (parentType.constructor) {
      case _graphql.GraphQLObjectType:
        return parentType.getFields()[keyName].type;
        break;
      case _graphql.GraphQLList:
        return parentType.ofType;
        break;
    }
  }, gqlType);
}