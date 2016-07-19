import React, {Component, PropTypes} from "react";
import {
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLObjectType
} from 'graphql'
import AutoForm from 'react-auto-form'
import {isFunction, capitalize} from 'lodash'

/**
 * A form component based on:
 * 1. AutoForm(https://github.com/insin/react-auto-form) for updating the data
 * 2. Form-React-Generator(https://github.com/SteveVitali/react-form-generator) for the schema
 *
 * There is a complementary "list" component. 
 * 
 * Changes for the schema:
 * 1. hidden - (Bool|Func) if function(data, schema) where data is the form data.
 * 2. display - (Bool) is displayed in the list screen
 * 3. renderLink - (Bool) render as a clickable item in the list screen
 * 4. readOnly - (Bool) render as a readonly field in the form screen
 */
class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {}
    }

    this.fields = {};
    this._initData();

    this._onChange = this._onChange.bind(this);
  }
  render() {
    const {onSubmit, schema} = this.props
    return (
      <AutoForm onSubmit={onSubmit} onChange={this._onChange} {...rest}>
        <div className="panel panel-default">
          <div className="panel-body">
            {this._renderSchema(schema)}
            {this._renderSubmitButton()}
          </div>
        </div>
      </AutoForm>
    )
  }
  /* default functionality on field change also invokes this.props.onChange */
  _onChange(event, name, data, change) {
    const newData = Object.assign({}, this.state.data, change);
    this.setState({data: newData});
    this.props.onChange && this.props.onChange.apply(this, arguments);
  }
  /* shoudl hide field based on the definition.hidden */
  _shouldHide(key, definition) {
    const autoform = definition.autoform || {};
    if (isFunction(autoform.hidden)) {
      return autoform.hidden(this.state.data, this.props.schema);
    } else {
      return !!autoform.hidden;
    }
  }

  /* init this.state.data with the correct data values */
  _initData() {
    if (this.props.data) {
      this.state.data = Object.assign({}, this.props.data);
    } else {
      const fields = this.props.schema.getFields();
      Object.keys(fields).forEach(key => {
        const autoform = fields[key].autoform || {};
        this.state.data[key] = autoform.defaultValue || null;
      });
    }
  }

  /* Get a default value for a given key */
  _getDefaultValue(key, definition) {
    return this.props.data ? this.props.data[key] || definition.defaultValue : definition.defaultValue;
  }

  /* render the entire schema (schema => {key: definition})*/
  _renderSchema(schema) {
    const fields = schema.getFields();
    return Object.keys(fields).map(key => this._renderField(key, fields[key]));
  }

  /* render a specific schema field */
  _renderField(key, definition) {
    const {type} = definition;
    const autoform = definition.autoform || {};
    let component;

    switch (type.constructor) {
      case GraphQLEnumType:
        component = this._renderEnumField(key, definition);
        break;
      case GraphQLObjectType:
        component = this._renderSchema(type)
        break;
      default:
        if(autoform.enum) {
          component = this._renderEnumField(key, definition);
        } else if (autoform.readOnly) {
          component = this._renderNonEditableField(key, definition);
        } else if (autoform.textarea) {
          component = this._renderTextAreaField(key, definition);
        } else {
          component = this._renderTextField(key, definition);
        }
    }

    return this._renderWrappedField(key, definition, component)
  }

  /* render a regular Text input for field type=String */
  _renderTextField(key, definition) {
    const label = this._getLabel(key, definition);
    return (<input name={key} type="text" className="form-control" ref={ref => this.fields[key] = ref} placeholder={label} defaultValue={this._getDefaultValue(key, definition)}/>);
  }

  _renderTextAreaField(key, definition) {
    const label = this._getLabel(key, definition);
    return (<textarea name={key} className="form-control" ref={ref => this.fields[key] = ref} placeholder={label} defaultValue={this._getDefaultValue(key, definition)}/>);
  }

  /* render a regular non-editable text field type=String */
  _renderNonEditableField(key, definition) {
    const label = this._getLabel(key, definition);
    return (<input name={key} type="text" disabled readOnly className="form-control" ref={ref => this.fields[key] = ref} placeholder={label} defaultValue={this._getDefaultValue(key, definition)}/>);
  }

  /* render a Select input for field type=String with enums */
  _renderEnumField(key, definition) {
    const autoform = definition.autoform || {};
    if (autoform.enum) {
      const values = (isFunction(autoform.enum) ? autoform.enum() : autoform.enum);

      return (
        <select name={key} className="form-control" ref={ref => this.fields[key] = ref} defaultValue={this._getDefaultValue(key, definition)}>
          {values.map((val) => (<option key={val} value={val}>{val}</option>))}
        </select>
      )
    } else {
      const values =  definition.type.getValues()

      return (
        <select name={key} className="form-control" ref={ref => this.fields[key] = ref} defaultValue={this._getDefaultValue(key, definition)}>
          {values.map((val) => (<option key={val.name} value={val.value}>{val.name}</option>))}
        </select>
      )
    }
  }

  /* wrap the field with bootstrap divs and add label */
  _renderWrappedField(key, definition, component) {
    const label = this._getLabel(key, definition);
    console.log('definition',definition)
    return this._shouldHide(key, definition) ? null : (
      <div className="form-group" key={key} style={{paddingLeft: 12}}>
        <label className="control-label">{label} </label>
        {component}
        {definition.description ? (<span class="help-block">{definition.description}</span>) : null}
      </div>
    )
  }

  /* render the submit button */
  _renderSubmitButton() {
    return (
      <div className="form-group">
        <button type="submit"> Submit </button>
      </div>
    )
  }
  
  _getLabel(key, definition) {
    const autoform = definition.autoform || {}
    return autoform.label ? autoform.label : capitalize(key);
  }
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

export default Form;