import React, {Component, PropTypes} from "react";
import BaseRenderer from './BaseRenderer';
import {renderField} from './render-field';

import {
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql'

export default class ListRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this.state = {
      nestedArr: []
    }
  }

  componentDidMount() {
    if(this.props.data) {
      this.props.data.forEach(() => this._addNewItem())
    } else {
      this._addNewItem();
    }
  }

  render() {
    const label = this.getLabel();

    if(!this.shouldRenderMyself()) return null;

    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{position:"relative"}}>
          {label ? (<label>{label}</label>) : null}
          {this._renderHelpText()}
          <button className="list-add-button" style={{position:"absolute", top: 15, right: 15}} onClick={(e) => this._addButtonClicked(e)}>
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
    let ofType = type.ofType;
    if(ofType.ofType) {
      ofType = ofType.ofType;
    }
    switch (ofType.constructor) {
      case GraphQLObjectType:
        return this._renderListOfObjectType()
        break;
      case GraphQLNonNull:
        return this._renderListOfNonNullType()
        break;
      default:
        return this._renderListOfScalarType()
    }
  }

  _renderListOfScalarType() {
    return this.state.nestedArr.map((nestedObj) => this._renderNestedField(nestedObj))
  }

  _renderListOfObjectType() {
    return this.state.nestedArr.map((nestedObj) => this._renderWrappedNestedField(nestedObj))
  }

  _renderListOfNonNullType() {
    return this.state.nestedArr.map((nestedObj) => this._renderWrappedNestedField(nestedObj))
  }

  _renderNestedField(nestedObj) {
    if(nestedObj.deleted) return null;

    const type = this.myType();
    const fieldType = type.ofType;

    const {object, formOptions, fieldsOptions, path, data} = this.props;
    const onChange = this._onFieldChanged;

    const childPath = this.buildPath(path, 'ofType');
    const childData = this.props.data ? this.props.data[nestedObj.key] : null;
    const props = {
      object,
      formOptions,
      fieldsOptions,
      path: childPath,
      title: null,
      data: childData,
      key: nestedObj.key,
      onChange
    }

    return (
    <fieldset className="form-horizontal" key={nestedObj.key}>
      <div className="form-group">
        <div className="col-sm-1">
          <button className="btn btn-default btn-xs list-add-button" style={{float:"right"}} onClick={(e) => this._removeButtonClicked(e, nestedObj)}>
            -
          </button>
        </div>
        <label className="col-sm-2 control-label">{nestedObj.title}</label>
        <div className="col-sm-9">
          {renderField.call(this, props, fieldType)}
        </div>
      </div>
    </fieldset>
    )
  }

  _renderWrappedNestedField(nestedObj) {
    if(nestedObj.deleted) return null;

    const type = this.myType();
    const fieldType = type.ofType;

    const {object, formOptions, fieldsOptions, path, data} = this.props;
    const onChange = this._onFieldChanged;

    const childPath = this.buildPath(path, 'ofType');
    const childData = this.props.data ? this.props.data[nestedObj.key] : null;
    const props = {
      object,
      formOptions,
      fieldsOptions,
      path: childPath,
      title: null,
      data: childData,
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