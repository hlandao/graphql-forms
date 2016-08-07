'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _ObjectTypeRenderer = require('./renderes/ObjectTypeRenderer.jsx');

var _ObjectTypeRenderer2 = _interopRequireDefault(_ObjectTypeRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props, context) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props, context));

    _this.onChange = _this.onChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var object = _props.object;
      var data = _props.data;
      var formOptions = _props.formOptions;

      return _react2.default.createElement(
        'form',
        { className: 'gql-form', onSubmit: this.onSubmit },
        _react2.default.createElement(
          'div',
          { className: 'panel panel-default' },
          _react2.default.createElement(
            'div',
            { className: 'panel-heading' },
            _react2.default.createElement(
              'label',
              { forHtml: '' },
              object.name
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'panel-body' },
            _react2.default.createElement(_ObjectTypeRenderer2.default, { object: object,
              data: data,
              title: null,
              formOptions: formOptions,
              onChange: this.onChange,
              ref: function ref(_ref) {
                return _this2.objectRef = _ref;
              } }),
            _react2.default.createElement(
              'button',
              { type: 'submit' },
              'Submit'
            )
          )
        )
      );
    }
  }, {
    key: 'onChange',
    value: function onChange(path, value) {
      var onChange = this.props.onChange;

      var formValue = this.getValue();
      onChange && onChange(path, value, formValue);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      e.preventDefault();
      var onSubmit = this.props.onSubmit;

      var formValue = this.getValue();
      onSubmit && onSubmit(formValue);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.objectRef.getValue();
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  object: _react.PropTypes.object.isRequired,
  autoform: _react.PropTypes.object,
  formOptions: _react.PropTypes.object,
  data: _react.PropTypes.object,
  onSubmit: _react.PropTypes.func,
  onChange: _react.PropTypes.func
};

Form.defaultProps = {
  formOptions: {
    nestedLevels: 1
  }
};

exports.default = Form;