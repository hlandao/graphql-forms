import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BlackBoxType} from './garphq-types'
import Form from '../src/Form.jsx'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Form object={BlackBoxType} onChange={(...args) => this.onChange(...args)} onSubmit={(...args) => this.onSubmit(...args)}/>
      </div>
    )
  }

  onChange(path, value, formValue) {
    console.log(`Form has changed ${path}=${value}. Form value:`,formValue)
  }

  onSubmit(formValue) {
   console.log(`Submit the form with value:`,formValue)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
