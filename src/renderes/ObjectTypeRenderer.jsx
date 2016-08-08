import React, {Component, PropTypes} from "react";
import BaseRenderer from './BaseRenderer';
import {renderField} from './render-field'

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

    if(!this.shouldRenderMyself()) return null;
    return title ? this._renderWithTitle() : this._renderWithoutTitle()
  }
  _renderWithTitle() {
    const {title} = this.props;
    const fieldOptions = this.myFieldOptions();

    return (
      <fieldset className={fieldOptions._inline ? 'form-inline' : ''}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <label>{title}</label>
            {this._renderHelpText()}
          </div>
          <div className="panel-body">
            {this._renderFields()}
          </div>
        </div>
      </fieldset>
    )
  }
  _renderWithoutTitle() {
    const fieldOptions = this.myFieldOptions();

    return (
      <fieldset className={fieldOptions._inline ? 'form-inline' : ''}>
        {this._renderFields()}
      </fieldset>
    )
  }
  _renderFields() {
    const myType = this.myType();
    const fields = myType.getFields();
    const {data, object, path, formOptions, fieldsOptions} = this.props;

    return Object.keys(fields).map(key => {
      const field = fields[key];

      const title = key;
      const newPath = this.buildPath(path, key);
      const onChange = this._onChange;

      return renderField.call(this, {title, object, data, formOptions, fieldsOptions, path: newPath, key, onChange}, field.type);
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