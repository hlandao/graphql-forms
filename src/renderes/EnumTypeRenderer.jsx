import React, {Component, PropTypes} from "react";

import BaseRenderer from './BaseRenderer.jsx';

export default class EnumTypeRenderer extends BaseRenderer {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {title} = this.props
    return (
      <div className="form-group">
        {title ? <label forHtml="">{title} </label> : null}
      </div>
    )
  }
}