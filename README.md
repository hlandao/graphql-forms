# graphql-forms

## Installation
```npm install graphql-forms --save```

## General

## API

### **Form** Props
* `object`: The GraphQLObjectType object - **mandatory**
* `data`: A data model to edit, should follow the provided schema - **optional**
* `onChange`: A function that is being when user change one of the fields (similar to react-auto-form)
**Function(path, value, formValue)**
* `onSubmit`: A function that is being invoked when user clicks submit. (similar to react-auto-form)
**Function(formValue)**