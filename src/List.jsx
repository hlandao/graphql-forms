import React, {Component, PropTypes} from "react";
import {capitalize, isArray} from 'lodash';

class List extends Component {
  constructor(props, context) {
    super(props, context);
    this._renderRow = this._renderRow.bind(this);
    this._clickedDeleteRow = this._clickedDeleteRow.bind(this);
  }
  render() {
    const {title, addItemFn, loading} = this.props;
    return (
      <div className="container-fluid">
        {title ? (<h2>{title}</h2>) : null }
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
    const {object, data, deleteItemFn, fieldsOptions} = this.props;
    const fields = object.getFields();
    return (
      <table className="table">
        <thead>
        <tr>
          {Object.keys(fields).map((key) => {
            const field = fields[key];
            const fieldOptions = fieldsOptions[key] || {};
            const label = fieldOptions._label || capitalize(field.name) || capitalize(key);
            return !fieldOptions._hidden ? (<td key={key}>{label}</td>): null
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
    const {object, deleteItemFn, fieldsOptions} = this.props;
    const fields = object.getFields();
    const idField = this._idField();
    if(!rowData[idField]) return null;

    return (
      <tr key={rowData[idField]}>
        {Object.keys(fields).map((key) => {
          const fieldOptions = fieldsOptions[key] || {};
          const text = this._renderRowText(rowData[key]);
          return !fieldOptions._hidden ? (<td key={key}> {fieldOptions._renderAsLink ? (<a href="#" onClick={() => this._clickedItem(rowData, key)}>{text}</a>) : text} </td>) : null
        })}
        {deleteItemFn ? (<td> <button className="btn btn-default" onClick={() => this._clickedDeleteRow(rowData[idField])}>Remove</button> </td>) : null }
      </tr>
    )
  }
  _renderRowText(val) {
    if(isArray(val)) {
      return val.join(', ');
    } else {
      return val;
    }
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
  _idField() {
    return this.props.listOptions.idField;
  }
}

List.propTypes = {
  title: PropTypes.string.isRequired, /* (String) Display name for the header of the page */
  object: PropTypes.object.isRequired, /* (Object) The schema to be rendered */
  data: PropTypes.array.isRequired, /* (Array) array of the items to be displayed, must have same fields as the schema */
  listOptions: PropTypes.object.isRequired,
  fieldsOptions: PropTypes.object.isRequired,
  loading: PropTypes.bool, /* (Bool) whether data is being loaded at the moment */
  error: PropTypes.string, /* (String) a string to be displayed in case of an error */
  deleteItemFn: PropTypes.func, /* (Func) a function(id) to be invoked when user clicks remove. If no func is provided, remove button will not be rendered */
  addItemFn: PropTypes.func, /* (Func) a function() to be invoked when user clicks  the add button */
  clickItemFn: PropTypes.func /* (Func) a function(item, key) to be invoked when user clicks the item where key is the key that was clicked. */
};

List.defaultProps = {
  listOptions: {
    idField: 'id'
  },
  fieldsOptions: {}
}

export default List;
