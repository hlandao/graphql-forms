import React, {Component, PropTypes} from "react";
import {
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLUnionType
} from 'graphql'
import ScalarTypeRenderer from './ScalarTypeRenderer';
import ListRenderer from './ListRenderer';
import EnumTypeRenderer from './EnumTypeRenderer';
import ObjectTypeRenderer from './ObjectTypeRenderer';

export function renderField(props, type) {

  switch (type.constructor) {
    case GraphQLScalarType:
      return <ScalarTypeRenderer {...props} ref={(r) => {this.nested[props.key] = r;}} />;
      break;
    case GraphQLObjectType:
    case GraphQLInputObjectType:
      return <ObjectTypeRenderer {...props} ref={(r) => {this.nested[props.key] = r;}} />;
      break;
    case GraphQLEnumType:
      return <EnumTypeRenderer {...props} ref={(r) => {this.nested[props.key] = r;}} />;
      break;
    case GraphQLList:
      return <ListRenderer {...props} ref={(r) => {this.nested[props.key] = r;}} />;
      break;
    case GraphQLNonNull:
      props.path = props.path + '.ofType';
      return renderField.call(this, props, type.ofType);
      break;
    case GraphQLUnionType:
      const newType = type.getTypes()[0];
      props.path += '.union0';
      return renderField.call(this, props, newType);
      break;
  }

  return null;
}


