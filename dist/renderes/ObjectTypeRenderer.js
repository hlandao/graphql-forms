'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseRenderer2 = require('./BaseRenderer.jsx');

var _BaseRenderer3 = _interopRequireDefault(_BaseRenderer2);

var _renderField = require('./render-field.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectTypeRenderer = function (_BaseRenderer) {
  _inherits(ObjectTypeRenderer, _BaseRenderer);

  function ObjectTypeRenderer(props, context) {
    _classCallCheck(this, ObjectTypeRenderer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectTypeRenderer).call(this, props, context));

    _this.state = {
      value: {}
    };
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(ObjectTypeRenderer, [{
    key: 'render',
    value: function render() {
      var title = this.props.title;

      return title ? this._renderWithTitle() : this._renderWithoutTitle();
    }
  }, {
    key: '_renderWithTitle',
    value: function _renderWithTitle() {
      var title = this.props.title;

      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement(
            'label',
            { forHtml: '' },
            title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          this._renderFields()
        )
      );
    }
  }, {
    key: '_renderWithoutTitle',
    value: function _renderWithoutTitle() {
      return _react2.default.createElement(
        'div',
        null,
        this._renderFields()
      );
    }
  }, {
    key: '_renderFields',
    value: function _renderFields() {
      var _this2 = this;

      var myType = this.myType();
      var fields = myType.getFields();
      var _props = this.props;
      var data = _props.data;
      var object = _props.object;
      var path = _props.path;
      var formOptions = _props.formOptions;


      return Object.keys(fields).map(function (key) {
        var field = fields[key];

        var title = key;
        var newPath = _this2.buildPath(path, key);
        var onChange = _this2._onChange;
        return _renderField.renderField.call(_this2, { title: title, object: object, data: data, formOptions: formOptions, path: newPath, key: key, onChange: onChange }, field.type);
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var _this3 = this;

      var outputValue = {};
      Object.keys(this.nested).map(function (key) {
        var ref = _this3.nested[key];
        var value = ref.getValue();
        outputValue[key] = value;
      });

      return outputValue;
    }
  }, {
    key: '_onChange',
    value: function _onChange(path, value) {
      this._onFieldChanged(path, value);
    }
  }]);

  return ObjectTypeRenderer;
}(_BaseRenderer3.default);

exports.default = ObjectTypeRenderer;