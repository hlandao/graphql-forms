import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import MyForm from './my-form.jsx'
import MyList from './my-list.jsx'
import Layout from './layout.jsx'

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={MyForm}/>
      <Route path="/list" component={MyList}/>
    </Route>
  </Router>
), document.getElementById('app'))
