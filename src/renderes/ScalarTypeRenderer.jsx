import React, {Component, PropTypes} from "react";

import BaseRenderer from './BaseRenderer.jsx';

export default class ScalarTypeRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);
    this.state = {
      value: ''
    }
  }

  render() {
    const {title} = this.props
    return (
      <div className="form-group">
        {title ? <label forHtml="">{title} </label> : null}
        {this._renderInput()}
      </div>
    )
  }

  _renderInput() {
    let placeholder = this.props.placeholder || "";
    return (
      <input type="text" className="form-control" placeholder={placeholder} onChange={this._onChange} ref={(ref) => {this.input=ref}} />
    )
  }

  _onChange(e) {
    const {onChange, path} = this.props;
    const value = e.target.value;
    this.setState({value})
    onChange(path, value)
  }

  getValue() {
    return this.input.value || "";
  }
}