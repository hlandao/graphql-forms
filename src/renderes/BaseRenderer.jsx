import React, {Component, PropTypes} from "react";
import {typeByPath} from './type-by-path.js'

export default class BaseRenderer extends Component {
  constructor(props, context) {
    super(props, context);

    this.nested = {}
    this._onFieldChanged = this._onFieldChanged.bind(this)
    this.getValue = this.getValue.bind(this)
    this.getKey = this.getKey.bind(this)
  }

  myType() {
    const {object, path} = this.props;
    return typeByPath(object, path);
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
  _onFieldChanged(path, value) {
    const {onChange} = this.props;
    onChange && onChange(path, value);
  }
  getValue() {
    return null;
  }
  getKey() {
    return this.props.key;
  }
}


BaseRenderer.propTypes = {
  object: PropTypes.object.isRequired,
  formOptions: PropTypes.object.isRequired,
  path: PropTypes.string,
  title: PropTypes.string,
  key: PropTypes.string,
  data: PropTypes.object,
  onChange: PropTypes.func
}
