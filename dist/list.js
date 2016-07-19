"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
  _inherits(List, _Component);

  function List(props, context) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, props, context));

    _this._renderRow = _this._renderRow.bind(_this);
    _this._clickedDeleteRow = _this._clickedDeleteRow.bind(_this);
    _this._getAutoform = _this._getAutoform.bind(_this);
    return _this;
  }

  _createClass(List, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var displayName = _props.displayName;
      var addItemFn = _props.addItemFn;
      var loading = _props.loading;

      return _react2.default.createElement(
        "div",
        { className: "container-fluid" },
        displayName ? _react2.default.createElement(
          "h2",
          null,
          displayName
        ) : null,
        addItemFn ? _react2.default.createElement(
          "a",
          { href: "#", onClick: function onClick() {
              return _this2._clickedAddItem();
            } },
          "+ Add"
        ) : null,
        loading ? this._renderLoading() : this._renderTable()
      );
    }
  }, {
    key: "_renderLoading",
    value: function _renderLoading() {
      return _react2.default.createElement(
        "div",
        null,
        " Loading... "
      );
    }
  }, {
    key: "_renderTable",
    value: function _renderTable() {
      var _this3 = this;

      var _props2 = this.props;
      var schema = _props2.schema;
      var data = _props2.data;
      var addItemFn = _props2.addItemFn;
      var deleteItemFn = _props2.deleteItemFn;

      var fields = schema.getFields();
      return _react2.default.createElement(
        "table",
        { className: "table" },
        _react2.default.createElement(
          "thead",
          null,
          _react2.default.createElement(
            "tr",
            null,
            Object.keys(fields).map(function (key) {
              var autoform = _this3._getAutoform(key);
              var label = autoform.label || (0, _lodash.capitalize)(key);
              return autoform.displayInList ? _react2.default.createElement(
                "td",
                { key: key },
                label
              ) : null;
            }),
            deleteItemFn ? _react2.default.createElement(
              "td",
              null,
              " Remove "
            ) : null
          )
        ),
        _react2.default.createElement(
          "tbody",
          null,
          data.map(this._renderRow)
        )
      );
    }
  }, {
    key: "_renderRow",
    value: function _renderRow(rowData) {
      var _this4 = this;

      var _props3 = this.props;
      var schema = _props3.schema;
      var deleteItemFn = _props3.deleteItemFn;

      var fields = schema.getFields();
      return _react2.default.createElement(
        "tr",
        { key: rowData._id },
        Object.keys(fields).map(function (key) {
          var autoform = _this4._getAutoform(key);
          return autoform.displayInList ? _react2.default.createElement(
            "td",
            { key: key },
            " ",
            autoform.renderAsLink ? _react2.default.createElement(
              "a",
              { href: "#", onClick: function onClick() {
                  return _this4._clickedItem(rowData, key);
                } },
              rowData[key]
            ) : rowData[key],
            " "
          ) : null;
        }),
        deleteItemFn ? _react2.default.createElement(
          "td",
          null,
          " ",
          _react2.default.createElement(
            "button",
            { className: "btn btn-default", onClick: function onClick() {
                return _this4._clickedDeleteRow(rowData._id);
              } },
            "Remove"
          ),
          " "
        ) : null
      );
    }
  }, {
    key: "_clickedAddItem",
    value: function _clickedAddItem() {
      if (this.props.addItemFn) {
        this.props.addItemFn();
      } else {
        alert("list: addItemFn is not defined");
      }
    }
  }, {
    key: "_clickedDeleteRow",
    value: function _clickedDeleteRow(id) {
      if (this.props.deleteItemFn) {
        this.props.deleteItemFn(id);
      } else {
        alert("list: deleteRowFn is not defined");
      }
    }
  }, {
    key: "_clickedItem",
    value: function _clickedItem(rowData, keyClicked) {
      if (this.props.clickItemFn) {
        this.props.clickItemFn(rowData, keyClicked);
      } else {
        alert("list: clickItemFn is not defined");
      }
    }
  }, {
    key: "_getAutoform",
    value: function _getAutoform(key) {
      var _props4 = this.props;
      var schema = _props4.schema;
      var deleteItemFn = _props4.deleteItemFn;

      var fields = schema.getFields();
      var definition = fields[key];
      var originalAutoform = definition.autoform || {};
      var propsAutoform = this.props.autoform ? this.props.autoform[key] || {} : {};
      return Object.assign({}, originalAutoform, propsAutoform);
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  displayName: _react.PropTypes.string.isRequired, /* (String) Display name for the header of the page */
  schema: _react.PropTypes.object.isRequired, /* (Object) The schema to be rendered */
  data: _react.PropTypes.array.isRequired, /* (Array) array of the items to be displayed, must have same fields as the schema */
  loading: _react.PropTypes.bool, /* (Bool) whether data is being loaded at the moment */
  error: _react.PropTypes.string, /* (String) a string to be displayed in case of an error */
  deleteItemFn: _react.PropTypes.func, /* (Func) a function(_id) to be invoked when user clicks remove. If no func is provided, remove button will not be rendered */
  addItemFn: _react.PropTypes.func, /* (Func) a function() to be invoked when user clicks  the add button */
  clickItemFn: _react.PropTypes.func, /* (Func) a function(item, key) to be invoked when user clicks the item where key is the key that was clicked. */
  autoform: _react.PropTypes.object /* (Object) an object to override each fields "autoform" properties. {FIELD_NAME: {AUTOFORM_PROPERTIES}} */
};

exports.default = List;