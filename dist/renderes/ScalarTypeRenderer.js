'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseRenderer2 = require('./BaseRenderer.jsx');

var _BaseRenderer3 = _interopRequireDefault(_BaseRenderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScalarTypeRenderer = function (_BaseRenderer) {
  _inherits(ScalarTypeRenderer, _BaseRenderer);

  function ScalarTypeRenderer(props, context) {
    _classCallCheck(this, ScalarTypeRenderer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScalarTypeRenderer).call(this, props, context));

    _this._onChange = _this._onChange.bind(_this);
    _this.state = {
      value: ''
    };
    return _this;
  }

  _createClass(ScalarTypeRenderer, [{
    key: 'render',
    value: function render() {
      var label = this.getLabel();

      if (!this.shouldRenderMyself()) return null;

      return _react2.default.createElement(
        'div',
        { className: 'form-group' },
        label ? _react2.default.createElement(
          'label',
          { forHtml: '' },
          label,
          ' '
        ) : null,
        this._renderInput(),
        this._renderHelpText()
      );
    }
  }, {
    key: '_renderInput',
    value: function _renderInput() {
      var _this2 = this;

      var placeholder = this.getPlaceholder();
      return _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: placeholder, onChange: this._onChange, ref: function ref(_ref) {
          _this2.input = _ref;
        } });
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      var _props = this.props;
      var onChange = _props.onChange;
      var path = _props.path;

      var value = e.target.value;
      this.setState({ value: value });
      onChange(path, value);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.input ? this.input.value : "";
    }
  }]);

  return ScalarTypeRenderer;
}(_BaseRenderer3.default);

exports.default = ScalarTypeRenderer;