import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BlackBoxType} from './garphq-types'
import Form from '../src/Form.jsx'

const FIELDS_OPTIONS = {
  id: {
    _hidden: true
  },
  name: {
    _label: 'The Label of Name',
    _helpText: 'Helper for name',
    _placeholder: 'Placeholder for name...'
  },
  nestedExample: {
    color: {
      _hidden: true
    }
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      formValue: {}
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <Form object={BlackBoxType} fieldsOptions={FIELDS_OPTIONS} onChange={(...args) => this.onChange(...args)} onSubmit={(...args) => this.onSubmit(...args)}/>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading"> Form Value </div>
              <div className="panel-body">
                <textarea style={{width:'100%'}} rows={20} readOnly value={JSON.stringify(this.state.formValue, null, '\t')}></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5>Fields Options Being Used:</h5>
            <textarea style={{width:'100%'}} rows={10} readOnly value={JSON.stringify(FIELDS_OPTIONS, null, 4)}></textarea>
          </div>
        </div>
      </div>
    )
  }

  onChange(path, value, formValue) {
    console.log(`Form has changed ${path}=${value}. Form value:`,formValue)
    this.setState({formValue});
  }

  onSubmit(formValue) {
   console.log(`Submit the form with value:`,formValue)
    alert('Form was submitted. See console for form values.')
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
