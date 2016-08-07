"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _typeByPath = require("./type-by-path.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseRenderer = function (_Component) {
  _inherits(BaseRenderer, _Component);

  function BaseRenderer(props, context) {
    _classCallCheck(this, BaseRenderer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseRenderer).call(this, props, context));

    _this.nested = {};
    _this._onFieldChanged = _this._onFieldChanged.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    _this.getKey = _this.getKey.bind(_this);
    return _this;
  }

  _createClass(BaseRenderer, [{
    key: "myType",
    value: function myType() {
      var _props = this.props;
      var object = _props.object;
      var path = _props.path;

      return (0, _typeByPath.typeByPath)(object, path);
    }
  }, {
    key: "buildPath",
    value: function buildPath(parentPath, keyName) {
      parentPath = parentPath || "";
      keyName = keyName || "";

      var myPath = parentPath;
      myPath += keyName && parentPath ? '.' : '';
      myPath += keyName;

      return myPath;
    }
  }, {
    key: "myNestedLevel",
    value: function myNestedLevel() {
      return this.props.path ? this.props.path.split('.').length : 1;
    }
  }, {
    key: "_onFieldChanged",
    value: function _onFieldChanged(path, value) {
      var onChange = this.props.onChange;

      onChange && onChange(path, value);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return null;
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.props.key;
    }
  }]);

  return BaseRenderer;
}(_react.Component);

exports.default = BaseRenderer;


BaseRenderer.propTypes = {
  object: _react.PropTypes.object.isRequired,
  formOptions: _react.PropTypes.object.isRequired,
  path: _react.PropTypes.string,
  title: _react.PropTypes.string,
  key: _react.PropTypes.string,
  data: _react.PropTypes.object,
  onChange: _react.PropTypes.func
};