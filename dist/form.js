'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _graphql = require('graphql');

var _reactAutoForm = require('react-auto-form');

var _reactAutoForm2 = _interopRequireDefault(_reactAutoForm);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A form component based on:
 * 1. AutoForm(https://github.com/insin/react-auto-form) for updating the data
 * 2. Form-React-Generator(https://github.com/SteveVitali/react-form-generator) for the schema
 *
 * There is a complementary "list" component. 
 * 
 * Changes for the schema:
 * 1. hidden - (Bool|Func) if function(data, schema) where data is the form data.
 * 2. display - (Bool) is displayed in the list screen
 * 3. renderLink - (Bool) render as a clickable item in the list screen
 * 4. readOnly - (Bool) render as a readonly field in the form screen
 */

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props, context) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props, context));

    _this.state = {
      data: {}
    };

    _this.fields = {};
    _this._initData();

    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var onSubmit = _props.onSubmit;
      var schema = _props.schema;

      return _react2.default.createElement(
        _reactAutoForm2.default,
        _extends({ onSubmit: onSubmit, onChange: this._onChange }, rest),
        _react2.default.createElement(
          'div',
          { className: 'panel panel-default' },
          _react2.default.createElement(
            'div',
            { className: 'panel-body' },
            this._renderSchema(schema),
            this._renderSubmitButton()
          )
        )
      );
    }
    /* default functionality on field change also invokes this.props.onChange */

  }, {
    key: '_onChange',
    value: function _onChange(event, name, data, change) {
      var newData = Object.assign({}, this.state.data, change);
      this.setState({ data: newData });
      this.props.onChange && this.props.onChange.apply(this, arguments);
    }
    /* shoudl hide field based on the definition.hidden */

  }, {
    key: '_shouldHide',
    value: function _shouldHide(key, definition) {
      var autoform = definition.autoform || {};
      if ((0, _lodash.isFunction)(autoform.hidden)) {
        return autoform.hidden(this.state.data, this.props.schema);
      } else {
        return !!autoform.hidden;
      }
    }

    /* init this.state.data with the correct data values */

  }, {
    key: '_initData',
    value: function _initData() {
      var _this2 = this;

      if (this.props.data) {
        this.state.data = Object.assign({}, this.props.data);
      } else {
        (function () {
          var fields = _this2.props.schema.getFields();
          Object.keys(fields).forEach(function (key) {
            var autoform = fields[key].autoform || {};
            _this2.state.data[key] = autoform.defaultValue || null;
          });
        })();
      }
    }

    /* Get a default value for a given key */

  }, {
    key: '_getDefaultValue',
    value: function _getDefaultValue(key, definition) {
      return this.props.data ? this.props.data[key] || definition.defaultValue : definition.defaultValue;
    }

    /* render the entire schema (schema => {key: definition})*/

  }, {
    key: '_renderSchema',
    value: function _renderSchema(schema) {
      var _this3 = this;

      var fields = schema.getFields();
      return Object.keys(fields).map(function (key) {
        return _this3._renderField(key, fields[key]);
      });
    }

    /* render a specific schema field */

  }, {
    key: '_renderField',
    value: function _renderField(key, definition) {
      var type = definition.type;

      var autoform = definition.autoform || {};
      var component = void 0;

      switch (type.constructor) {
        case _graphql.GraphQLEnumType:
          component = this._renderEnumField(key, definition);
          break;
        case _graphql.GraphQLObjectType:
          component = this._renderSchema(type);
          break;
        default:
          if (autoform.enum) {
            component = this._renderEnumField(key, definition);
          } else if (autoform.readOnly) {
            component = this._renderNonEditableField(key, definition);
          } else if (autoform.textarea) {
            component = this._renderTextAreaField(key, definition);
          } else {
            component = this._renderTextField(key, definition);
          }
      }

      return this._renderWrappedField(key, definition, component);
    }

    /* render a regular Text input for field type=String */

  }, {
    key: '_renderTextField',
    value: function _renderTextField(key, definition) {
      var _this4 = this;

      var label = this._getLabel(key, definition);
      return _react2.default.createElement('input', { name: key, type: 'text', className: 'form-control', ref: function ref(_ref) {
          return _this4.fields[key] = _ref;
        }, placeholder: label, defaultValue: this._getDefaultValue(key, definition) });
    }
  }, {
    key: '_renderTextAreaField',
    value: function _renderTextAreaField(key, definition) {
      var _this5 = this;

      var label = this._getLabel(key, definition);
      return _react2.default.createElement('textarea', { name: key, className: 'form-control', ref: function ref(_ref2) {
          return _this5.fields[key] = _ref2;
        }, placeholder: label, defaultValue: this._getDefaultValue(key, definition) });
    }

    /* render a regular non-editable text field type=String */

  }, {
    key: '_renderNonEditableField',
    value: function _renderNonEditableField(key, definition) {
      var _this6 = this;

      var label = this._getLabel(key, definition);
      return _react2.default.createElement('input', { name: key, type: 'text', disabled: true, readOnly: true, className: 'form-control', ref: function ref(_ref3) {
          return _this6.fields[key] = _ref3;
        }, placeholder: label, defaultValue: this._getDefaultValue(key, definition) });
    }

    /* render a Select input for field type=String with enums */

  }, {
    key: '_renderEnumField',
    value: function _renderEnumField(key, definition) {
      var _this7 = this;

      var autoform = definition.autoform || {};
      if (autoform.enum) {
        var values = (0, _lodash.isFunction)(autoform.enum) ? autoform.enum() : autoform.enum;

        return _react2.default.createElement(
          'select',
          { name: key, className: 'form-control', ref: function ref(_ref4) {
              return _this7.fields[key] = _ref4;
            }, defaultValue: this._getDefaultValue(key, definition) },
          values.map(function (val) {
            return _react2.default.createElement(
              'option',
              { key: val, value: val },
              val
            );
          })
        );
      } else {
        var _values = definition.type.getValues();

        return _react2.default.createElement(
          'select',
          { name: key, className: 'form-control', ref: function ref(_ref5) {
              return _this7.fields[key] = _ref5;
            }, defaultValue: this._getDefaultValue(key, definition) },
          _values.map(function (val) {
            return _react2.default.createElement(
              'option',
              { key: val.name, value: val.value },
              val.name
            );
          })
        );
      }
    }

    /* wrap the field with bootstrap divs and add label */

  }, {
    key: '_renderWrappedField',
    value: function _renderWrappedField(key, definition, component) {
      var label = this._getLabel(key, definition);
      console.log('definition', definition);
      return this._shouldHide(key, definition) ? null : _react2.default.createElement(
        'div',
        { className: 'form-group', key: key, style: { paddingLeft: 12 } },
        _react2.default.createElement(
          'label',
          { className: 'control-label' },
          label,
          ' '
        ),
        component,
        definition.description ? _react2.default.createElement(
          'span',
          { 'class': 'help-block' },
          definition.description
        ) : null
      );
    }

    /* render the submit button */

  }, {
    key: '_renderSubmitButton',
    value: function _renderSubmitButton() {
      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'button',
          { type: 'submit' },
          ' Submit '
        )
      );
    }
  }, {
    key: '_getLabel',
    value: function _getLabel(key, definition) {
      var autoform = definition.autoform || {};
      return autoform.label ? autoform.label : (0, _lodash.capitalize)(key);
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  schema: _react.PropTypes.object.isRequired,
  data: _react.PropTypes.object,
  onSubmit: _react.PropTypes.func,
  onChange: _react.PropTypes.func
};

exports.default = Form;