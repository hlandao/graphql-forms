import React, {Component, PropTypes} from "react";
import BaseRenderer from './BaseRenderer.jsx';
import {renderField} from './render-field.js'

export default class ObjectTypeRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: {}
    }
    this._onChange = this._onChange.bind(this);
  }

  render() {
    const {title} = this.props;
    return title ? this._renderWithTitle() : this._renderWithoutTitle()
  }
  _renderWithTitle() {
    const {title} = this.props;
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><label forHtml="">{title}</label></div>
        <div className="panel-body">
          {this._renderFields()}
        </div>
      </div>
    )
  }
  _renderWithoutTitle() {
    return (
      <div>
        {this._renderFields()}
      </div>
    )
  }
  _renderFields() {
    const myType = this.myType();
    const fields = myType.getFields();
    const {data, object, path, formOptions} = this.props;

    return Object.keys(fields).map(key => {
      const field = fields[key];

      const title = key;
      const newPath = this.buildPath(path, key);
      const onChange = this._onChange;
      return renderField.call(this, {title, object, data, formOptions, path: newPath, key, onChange}, field.type);
    })
  }

  getValue() {
    let outputValue = {}
    Object.keys(this.nested).map(key => {
      const ref = this.nested[key];
      const value = ref.getValue();
      outputValue[key] = value;
    })

    return outputValue;
  }
  _onChange(path, value) {
    this._onFieldChanged(path, value);
  }
}