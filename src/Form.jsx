import React, {Component, PropTypes} from "react";
import {isFunction, capitalize} from 'lodash'
import ObjectTypeRenderer from './renderes/ObjectTypeRenderer'

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const {object, data, formOptions, fieldsOptions} = this.props

    const submitButtonHidden = formOptions.submitButton && formOptions.submitButton.hidden;
    const submitTitle = formOptions.submitButton && formOptions.submitButton.title ? formOptions.submitButton.title : "Submit";
    const title = formOptions.title || object.name;
    return (
      <form className="gql-form" onSubmit={this.onSubmit}>
        <div className="panel panel-default">
          <div className="panel-heading"><label>{title}</label></div>
          <div className="panel-body">
            <ObjectTypeRenderer object={object}
                                data={data}
                                title={null}
                                formOptions={formOptions}
                                fieldsOptions={fieldsOptions}
                                onChange={this.onChange}
                                ref={ref => this.objectRef = ref}/>
            {submitButtonHidden ? null : <button type="submit">{submitTitle}</button>}
          </div>
        </div>
      </form>
    )
  }

  onChange(path, value) {
    const {onChange} = this.props
    const formValue = this.getValue();
    onChange && onChange(path, value, formValue);
  }

  onSubmit(e) {
    e.preventDefault();
    const {onSubmit} = this.props
    const formValue = this.getValue();
    onSubmit && onSubmit(formValue);
  }

  getValue() {
    return this.objectRef.getValue();
  }
}

Form.propTypes = {
  object: PropTypes.object.isRequired,
  formOptions: PropTypes.object,
  fieldsOptions: PropTypes.object,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

Form.defaultProps = {
  formOptions: {
    nestedLevels: 3,
    submitButton: {
      title: "Submit"
    },
    title: ""
  },
  fieldsOptions: {}
}

export default Form;