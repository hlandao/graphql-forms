import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Layout extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      formValue: {}
    }
  }
  render() {
    return (
      <div className="container">


        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to={`/`}>Form</Link></li>
            <li><Link to={`/list`}>List</Link></li>
          </ul>
        </div>
        <div className="container" style={{paddingTop: 10}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

