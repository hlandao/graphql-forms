import React, {Component, PropTypes} from "react";
import BaseRenderer from './BaseRenderer.jsx';
import {renderField} from './render-field.js';

import {
  GraphQLObjectType,
} from 'graphql'

export default class ListRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nestedArr: []
    }
  }

  componentDidMount() {
    this._addNewItem();
  }

  render() {
    const {title} = this.props
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {title ? (<label forHtml="">{title}</label>) : null}

          <button className="list-add-button" style={{float:"right"}} onClick={(e) => this._addButtonClicked(e)}>
            +
          </button>
        </div>
        <div className="panel-body">
          {this._renderList()}
        </div>
      </div>
    )
  }

  _renderList() {
    const type = this.myType();
    const ofType = type.ofType;

    switch (ofType.constructor) {
      case GraphQLObjectType:
        return this._renderListOfObjectType()
        break;
      default:
        return this._renderListOfScalarType()
    }
  }

  _renderListOfScalarType() {
    return this.state.nestedArr.map((nestedObj) => this._renderNestedField(nestedObj))
  }

  _renderListOfObjectType() {
    return this.state.nestedArr.map((nestedObj) => this._renderNestedField(nestedObj))
  }

  _renderNestedField(nestedObj) {
    if(nestedObj.deleted) return null;

    const type = this.myType();
    const fieldType = type.ofType;

    const {object, formOptions, path, data} = this.props;
    const onChange = this._onFieldChanged;

    const props = {
      object,
      formOptions,
      path: this.buildPath(path, 'ofType'),
      title: null,
      data,
      key: nestedObj.key,
      onChange
    }

    return (
      <div className="panel panel-default" key={nestedObj.key}>
        <div className="panel-heading">
          {nestedObj.title}
          <button className="list-add-button" style={{float:"right"}} onClick={(e) => this._removeButtonClicked(e, nestedObj)}>
            -
          </button>
        </div>
        <div className="panel-body">
          {renderField.call(this, props, fieldType)}
        </div>
      </div>
    )
  }

  _addButtonClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    this._addNewItem();
  }

  _addNewItem() {
    const {title} = this.props;
    const {nestedArr} = this.state;

    nestedArr.push({deleted: false, title: `${title}_${nestedArr.length+1}`, key: nestedArr.length});
    this.setState({nestedArr});
  }

  _removeButtonClicked(e, nestedObj) {
    e.preventDefault();
    e.stopPropagation();

    nestedObj.deleted = true;
    const nestedArr = this.state.nestedArr;
    this.setState({nestedArr})
  }

  getValue() {
    const {nestedArr} = this.state;
    let outputValue = []
    Object.keys(this.nested).map(key => {

      const index = parseInt(key);
      if(nestedArr[index].deleted) return;

      const ref = this.nested[key];
      const value = ref.getValue();
      outputValue.push(value);
    })

    return outputValue;
  }

}