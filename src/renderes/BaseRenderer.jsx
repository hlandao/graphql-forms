import React, {Component, PropTypes} from "react";
import {typeByPath, fieldByPath} from './type-by-path.js'
import {isFunction} from 'lodash';
import {GraphQLScalarType} from 'graphql';
import {reduce} from 'lodash';

export default class BaseRenderer extends Component {
  constructor(props, context) {
    super(props, context);

    this.nested = {}
    this._onFieldChanged = this._onFieldChanged.bind(this)
    this.getValue = this.getValue.bind(this)
  }

  _renderHelpText() {
    const helpText = this.getHelpText();
    return helpText ? (<span className="help-block">{helpText}</span>) : null;
  }

  myType() {
    const {object, path} = this.props;
    return typeByPath(object, path);
  }
  myField() {
    const {object, path} = this.props;
    return fieldByPath(object, path);
  }
  buildPath(parentPath, keyName) {
    parentPath = parentPath || "";
    keyName = keyName||""

    let myPath = parentPath;
    myPath += (keyName&&parentPath) ? '.' : '';
    myPath += keyName;

    return myPath;
  }
  myNestedLevel() {
    return this.props.path ? this.props.path.split('.').length : 1 ;
  }
  myFieldOptions() {
    return this.getFieldOptions(this.props.path);
  }
  _onFieldChanged(path, value) {
    const {onChange} = this.props;
    onChange && onChange(path, value);
  }
  getValue() {
    return null;
  }
  getFieldOptions(path) {
    const arr = path ? path.split('.') : [];
    return reduce(arr, (fieldsOptions, key) => {
      return fieldsOptions[key] || {};
    }, this.props.fieldsOptions);
  }
  getPlaceholder() {
    const fieldOptions = this.myFieldOptions()
    return fieldOptions._placeholder || ""
  }
  getLabel() {
    const fieldOptions = this.myFieldOptions()
    return fieldOptions._label || this.props.title;
  }
  getHelpText() {
    const myField = this.myField()
    const fieldOptions = this.myFieldOptions()
    return fieldOptions.helpText ? fieldOptions.helpText : (myField ? myField.description : "");
  }
  shouldRenderMyself() {
    const {formOptions} = this.props;
    return !this.isHidden() && (this.myNestedLevel() <= formOptions.nestedLevels);
  }
  isHidden() {
    const fieldOptions = this.myFieldOptions()
    if(isFunction(fieldOptions._hidden)) {
      fieldOptions._hidden(this.getValue());
    } else {
      return !!fieldOptions._hidden;
    }
  }
}


BaseRenderer.propTypes = {
  object: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  fieldsOptions: PropTypes.object.isRequired,
  path: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object,
  onChange: PropTypes.func
}
