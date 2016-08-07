import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BlackBoxType} from './garphq-types'
import Form from '../src/Form.jsx'

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
            <Form object={BlackBoxType} onChange={(...args) => this.onChange(...args)} onSubmit={(...args) => this.onSubmit(...args)}/>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading"> Form Value </div>
              <div className="panel-body">
                <textarea style={{width:'100%'}} rows={20} value={JSON.stringify(this.state.formValue, null, '\t')}></textarea>
              </div>
            </div>
          </div>
        </div>
        <div>
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
