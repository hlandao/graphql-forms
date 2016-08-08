import React, {Component, PropTypes} from "react";

import BaseRenderer from './BaseRenderer';

export default class EnumTypeRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);

    this._onChange = this._onChange.bind(this);
    this.state = {
      value: ''
    }
  }

  render() {
    const label = this.getLabel();

    if(!this.shouldRenderMyself()) return null;

    return (
      <div className="form-group">
        {label ? <label>{label} </label> : null}
        {this._renderInput()}
        {this._renderHelpText()}
      </div>
    )
  }

  _renderInput() {
    let values = this.myType().getValues()

    return (
      <select type="text"
              className="form-control"
              onChange={this._onChange}
              ref={(ref) => {this.input=ref}}>
        {values.map((value) => (<option value={value.value} key={value.name}>{value.name}</option>))}
      </select>
    )
  }

  _onChange(e) {
    const {onChange, path} = this.props;
    const value = e.target.value;
    this.setState({value})
    onChange(path, value)
  }

  getValue() {
    return this.input ? this.input.value : "";
  }
}