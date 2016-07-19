import React, {Component, PropTypes} from "react";
import {capitalize} from 'lodash';

class List extends Component {
  constructor(props, context) {
    super(props, context);
    this._renderRow = this._renderRow.bind(this);
    this._clickedDeleteRow = this._clickedDeleteRow.bind(this);
    this._getAutoform = this._getAutoform.bind(this);
  }
  render() {
    const {displayName, addItemFn, loading} = this.props;
    return (
      <div className="container-fluid">
        {displayName ? (<h2>{displayName}</h2>) : null }
        {addItemFn ? (<a href="#" onClick={() => this._clickedAddItem()}>+ Add</a>) : null}
        {loading ? this._renderLoading() : this._renderTable()}
      </div>
    );
  }
  _renderLoading() {
    return (
      <div> Loading... </div>
    )
  }
  _renderTable() {
    const {schema, data, addItemFn, deleteItemFn} = this.props;
    const fields = schema.getFields();
    return (
      <table className="table">
        <thead>
        <tr>
          {Object.keys(fields).map((key) => {
            const autoform = this._getAutoform(key);
            const label = autoform.label || capitalize(key);
            return autoform.displayInList ? (<td key={key}>{label}</td>): null
          })}
          {deleteItemFn ? (<td> Remove </td>) : null }
        </tr>
        </thead>
        <tbody>
        {data.map(this._renderRow)}
        </tbody>
      </table>
    )
  }
  _renderRow(rowData) {
    const {schema, deleteItemFn} = this.props;
    const fields = schema.getFields();
    return (
      <tr key={rowData._id}>
        {Object.keys(fields).map((key) => {
          const autoform = this._getAutoform(key);
          return autoform.displayInList ? (<td key={key}> {autoform.renderAsLink ? (<a href="#" onClick={() => this._clickedItem(rowData, key)}>{rowData[key]}</a>) : rowData[key]} </td>) : null
        })}
        {deleteItemFn ? (<td> <button className="btn btn-default" onClick={() => this._clickedDeleteRow(rowData._id)}>Remove</button> </td>) : null }
      </tr>
    )
  }
  _clickedAddItem() {
    if(this.props.addItemFn) {
      this.props.addItemFn();
    } else {
      alert("list: addItemFn is not defined");
    }
  }
  _clickedDeleteRow(id) {
    if(this.props.deleteItemFn) {
      this.props.deleteItemFn(id);
    } else {
      alert("list: deleteRowFn is not defined");
    }
  }
  _clickedItem(rowData, keyClicked) {
    if(this.props.clickItemFn) {
      this.props.clickItemFn(rowData, keyClicked);
    } else {
      alert("list: clickItemFn is not defined");
    }
  }
  _getAutoform(key) {
    const {schema, deleteItemFn} = this.props;
    const fields = schema.getFields();
    const definition = fields[key];
    const originalAutoform = definition.autoform || {};
    const propsAutoform = this.props.autoform ? this.props.autoform[key] || {} : {};
    return Object.assign({}, originalAutoform, propsAutoform)
  }
}

List.propTypes = {
  displayName: PropTypes.string.isRequired, /* (String) Display name for the header of the page */
  schema: PropTypes.object.isRequired, /* (Object) The schema to be rendered */
  data: PropTypes.array.isRequired, /* (Array) array of the items to be displayed, must have same fields as the schema */
  loading: PropTypes.bool, /* (Bool) whether data is being loaded at the moment */
  error: PropTypes.string, /* (String) a string to be displayed in case of an error */
  deleteItemFn: PropTypes.func, /* (Func) a function(_id) to be invoked when user clicks remove. If no func is provided, remove button will not be rendered */
  addItemFn: PropTypes.func, /* (Func) a function() to be invoked when user clicks  the add button */
  clickItemFn: PropTypes.func, /* (Func) a function(item, key) to be invoked when user clicks the item where key is the key that was clicked. */
  autoform: PropTypes.object /* (Object) an object to override each fields "autoform" properties. {FIELD_NAME: {AUTOFORM_PROPERTIES}} */
};

export default List;
