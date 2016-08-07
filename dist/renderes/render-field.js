'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.renderField = renderField;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _graphql = require('graphql');

var _ScalarTypeRenderer = require('./ScalarTypeRenderer.jsx');

var _ScalarTypeRenderer2 = _interopRequireDefault(_ScalarTypeRenderer);

var _ListRenderer = require('./ListRenderer.jsx');

var _ListRenderer2 = _interopRequireDefault(_ListRenderer);

var _EnumTypeRenderer = require('./EnumTypeRenderer.jsx');

var _EnumTypeRenderer2 = _interopRequireDefault(_EnumTypeRenderer);

var _ObjectTypeRenderer = require('./ObjectTypeRenderer.jsx');

var _ObjectTypeRenderer2 = _interopRequireDefault(_ObjectTypeRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderField(props, type) {
  var _this = this;

  switch (type.constructor) {
    case _graphql.GraphQLScalarType:
      return _react2.default.createElement(_ScalarTypeRenderer2.default, _extends({}, props, { ref: function ref(r) {
          _this.nested[props.key] = r;
        } }));
      break;
    case _graphql.GraphQLObjectType:
      return _react2.default.createElement(_ObjectTypeRenderer2.default, _extends({}, props, { ref: function ref(r) {
          _this.nested[props.key] = r;
        } }));
      break;
    case _graphql.GraphQLEnumType:
      return _react2.default.createElement(_EnumTypeRenderer2.default, _extends({}, props, { ref: function ref(r) {
          _this.nested[props.key] = r;
        } }));
      break;
    case _graphql.GraphQLList:
      return _react2.default.createElement(_ListRenderer2.default, _extends({}, props, { ref: function ref(r) {
          _this.nested[props.key] = r;
        } }));
      break;
  }

  return null;
}