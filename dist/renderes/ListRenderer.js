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

var _graphql = require('graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListRenderer = function (_BaseRenderer) {
  _inherits(ListRenderer, _BaseRenderer);

  function ListRenderer(props, context) {
    _classCallCheck(this, ListRenderer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListRenderer).call(this, props, context));

    _this.state = {
      nestedArr: []
    };
    return _this;
  }

  _createClass(ListRenderer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._addNewItem();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var title = this.props.title;

      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          title ? _react2.default.createElement(
            'label',
            { forHtml: '' },
            title
          ) : null,
          _react2.default.createElement(
            'button',
            { className: 'list-add-button', style: { float: "right" }, onClick: function onClick(e) {
                return _this2._addButtonClicked(e);
              } },
            '+'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          this._renderList()
        )
      );
    }
  }, {
    key: '_renderList',
    value: function _renderList() {
      var type = this.myType();
      var ofType = type.ofType;

      switch (ofType.constructor) {
        case _graphql.GraphQLObjectType:
          return this._renderListOfObjectType();
          break;
        default:
          return this._renderListOfScalarType();
      }
    }
  }, {
    key: '_renderListOfScalarType',
    value: function _renderListOfScalarType() {
      var _this3 = this;

      return this.state.nestedArr.map(function (nestedObj) {
        return _this3._renderNestedField(nestedObj);
      });
    }
  }, {
    key: '_renderListOfObjectType',
    value: function _renderListOfObjectType() {
      var _this4 = this;

      return this.state.nestedArr.map(function (nestedObj) {
        return _this4._renderNestedField(nestedObj);
      });
    }
  }, {
    key: '_renderNestedField',
    value: function _renderNestedField(nestedObj) {
      var _this5 = this;

      if (nestedObj.deleted) return null;

      var type = this.myType();
      var fieldType = type.ofType;

      var _props = this.props;
      var object = _props.object;
      var formOptions = _props.formOptions;
      var path = _props.path;
      var data = _props.data;

      var onChange = this._onFieldChanged;

      var props = {
        object: object,
        formOptions: formOptions,
        path: this.buildPath(path, 'ofType'),
        title: null,
        data: data,
        key: nestedObj.key,
        onChange: onChange
      };

      return _react2.default.createElement(
        'div',
        { className: 'panel panel-default', key: nestedObj.key },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          nestedObj.title,
          _react2.default.createElement(
            'button',
            { className: 'list-add-button', style: { float: "right" }, onClick: function onClick(e) {
                return _this5._removeButtonClicked(e, nestedObj);
              } },
            '-'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _renderField.renderField.call(this, props, fieldType)
        )
      );
    }
  }, {
    key: '_addButtonClicked',
    value: function _addButtonClicked(e) {
      e.preventDefault();
      e.stopPropagation();
      this._addNewItem();
    }
  }, {
    key: '_addNewItem',
    value: function _addNewItem() {
      var title = this.props.title;
      var nestedArr = this.state.nestedArr;


      nestedArr.push({ deleted: false, title: title + '_' + (nestedArr.length + 1), key: nestedArr.length });
      this.setState({ nestedArr: nestedArr });
    }
  }, {
    key: '_removeButtonClicked',
    value: function _removeButtonClicked(e, nestedObj) {
      e.preventDefault();
      e.stopPropagation();

      nestedObj.deleted = true;
      var nestedArr = this.state.nestedArr;
      this.setState({ nestedArr: nestedArr });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var _this6 = this;

      var nestedArr = this.state.nestedArr;

      var outputValue = [];
      Object.keys(this.nested).map(function (key) {

        var index = parseInt(key);
        if (nestedArr[index].deleted) return;

        var ref = _this6.nested[key];
        var value = ref.getValue();
        outputValue.push(value);
      });

      return outputValue;
    }
  }]);

  return ListRenderer;
}(_BaseRenderer3.default);

exports.default = ListRenderer;