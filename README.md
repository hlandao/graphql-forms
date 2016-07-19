# graphql-forms

## Installation
```npm install graphql-forms --save```

## General

## API

### **Schema**
Each GraphQL object may have the `autoform` property with any of the following properties:
#### `label`
The label to be displayed in the form or in the list.
#### `readOnly`
If `true`, a read-only field will be rendered.
#### `displayInList`
If `true`, will be displayed in the list view.
#### `hidden`
If `true`, the field will be hidden in the form.
Can be either a Boolean or a function
As a function `Function(data)` it's invoked with current data model and it should return Boolean.
#### `renderAsLink`
If `true`, will be rendered as a clickabe href in the list view.

### **Form** Props
#### `schema`
The GraphQLObjectType object - **mandatory**
#### `data`
A data model to edit, should follow the provided schema - **optional**
#### `onChange`
A function that is being when user change one of the fields (similar to `react-auto-form`)
` function(event, name, data, change){}`
#### `onSubmit`
A function that is being invoked when user clicks submit. (similar to `react-auto-form`)
`Function(event, name, data, change)`

### **List** Props
#### `displayName`
The display name for the header of the page.
#### `schema`
The schema to be rendered.
#### `data`
Array of the items to be displayed, must have same fields as the schema.
#### `loading`
Whether data is being loaded at the moment.
#### `error`
A string to be displayed in case of an error.
#### `deleteItemFn`
A `Function(_id)` that's invoked when user clicks remove. If no func is provided, remove button will not be rendered.
#### `addItemFn`
A `Function()` that's invoked when user clicks  the add button .
#### `clickItemFn`
A function(item, key) to be invoked when user clicks the item where key is the key that was clicked.
#### `autoform`
An object to override each fields "autoform" properties. {FIELD_NAME: {AUTOFORM_PROPERTIES}}

## Example
**Schema**
```js
import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

export const BlackBoxesSchema = new GraphQLObjectType({
  name: 'BlackBoxes',
  description: '',
  fields: () => ({
    _id: {
      type: GraphQLID,
      autoform: {
        label: '_id',
        readOnly: true,
        displayInList: true,
        hidden: (data) => !data._id,
        renderAsLink: true
      }
    },
    name: {
      type: GraphQLString,
      autoform: {
        label: 'Name',
        isRequired: true,
        displayInList: true
      }
    },
    description: {
      type: GraphQLString,
      autoform: {
        label: 'Description',
        textarea: true,
        isRequired: true,
        displayInList: true
      }
    }
  })
});
```

**Form**
```js
<Form schema={BlackBoxesSchema}
      onChange={this._onFormChanged}
      onSubmit={this._onFormSubmit} />
```
**Edit Form**
```js
let model = {
    _id: "XXX",
    name: "XXX",
    description: "XXX"
}

<Form schema={BlackBoxesSchema}
      onChange={this._onFormChanged}
      onSubmit={this._onFormSubmit}
      data={model}/>
```
**List**
```js
  const autoformOverride = {description: {displayInList: false}};
  <List displayName="Black Boxes"
        schema={BlackBoxesSchema}
        data={data}
        loading={isLoading}
        deleteItemFn={this._clickedDeleteRow}
        addItemFn={this._clickedAddItem}
        clickItemFn={this._clickedShowRow}
        autoform={autoformOverride}
        />
```

## Example with Meteor
**Form**
```js
class BlackBoxAddScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this._onFormChanged = this._onFormChanged.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }
  render() {
    return (
      <div className="container-fluid">
        <h2> Add Black Box </h2>
        <div className="row">
          <div className="col-md-6">
            <Form schema={BlackBoxesSchema}
            onChange={this._onFormChanged} onSubmit={this._onFormSubmit} />
          </div>
        </div>
      </div>
    );
  }
  _onFormChanged(event, name, data, change) {
    console.log('form was changed:', change);
  }
  _onFormSubmit(e, data) {
    e.preventDefault();
    Meteor.call('insertBlackBox', data, (err) => {
    ...
    })
  }
}

export default BlackBoxAddScreen;
```

**List**
```js
class BlackBoxesScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this._clickedAddItem = this._clickedAddItem.bind(this);
    this._clickedDeleteRow = this._clickedDeleteRow.bind(this);
    this._clickedShowRow = this._clickedShowRow.bind(this);
  }
  render() {
    const {loading, data} = this.props;

    return (
      <List displayName="Black Boxes"
            schema={BlackBoxesSchema}
            data={data}
            loading={loading}
            deleteItemFn={this._clickedDeleteRow}
            addItemFn={this._clickedAddItem}
            clickItemFn={this._clickedShowRow}
            />
    );
  }
  _clickedAddItem() {
    console.log('user clicked on add button');
  }
  _clickedDeleteRow(id) {
    Meteor.call('removeBlackBox', id, (err) => {
      ...
    });
  }
  _clickedShowRow(rowData, keyClicked) {
    if(keyClicked === '_id') {
        console.log('user clicked on _id column');
    }
  }
}

BlackBoxesScreen.propTypes = {
  data: React.PropTypes.array,
  loading: React.PropTypes.bool,
  dataExists: React.PropTypes.bool,
};

export default BlackBoxesScreenContainer = createContainer(({ params }) => {
  const dataHandle = Meteor.subscribe('black-boxes');
  const loading = !dataHandle.ready();
  const data = BlackBoxesCollection.find()
  const dataExists = !loading && !!data;
  
  return {
    loading,
    dataExists,
    data: dataExists ? data.fetch() : []
  };
}, BlackBoxesScreen);
```

## Thanks
1. React-auto-form `https://github.com/insin/react-auto-form`
