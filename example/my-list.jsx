import React, {Component} from 'react';
import {Schema, BlackBoxType} from './garphq-schema'
import List from '../src/List.jsx'
import GraphiQL from 'graphiql';
import {mockServer} from 'graphql-tools'

const FIELDS_OPTIONS = {
  id: {
    _renderAsLink: true
  },
  listWithNestedObjectExample: {
    _hidden: true
  }
}
export default class MyList extends Component {
  constructor(props, context) {
    super(props, context);

    this.myMockServer = mockServer(Schema);

    this.state = {
      data: [],
      query: `query tasksForUser{
            blackBoxes {
              id,
              description,
              name
            }
          }`}
  }
  componentDidMount() {
    this.myMockServer.query(this.state.query, {}).then(res => {
      console.log('res',res)
      if(res.data && res.data.blackBoxes) {
        this.setState({data: res.data.blackBoxes})
      }
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <List data={this.state.data} title="Black Boxes" object={BlackBoxType} fieldsOptions={FIELDS_OPTIONS} clickItemFn={console.log}/>
          </div>
        </div>
      </div>
    )
  }
}

