# graphql-forms

## Installation
```npm install graphql-forms --save```

## General

## API

### **Form** Props
* `object`: The GraphQLObjectType object. - **(mandatory)**
* `data`: A data model to edit, should follow the provided schema. -  **(optional)**
* `formOptions`: Options for the apperance and the behavior of the form.  -  **(optional)**
* `fieldsOptions`: A map of options for the apperance and the behavior of each field. -  **(optional)**
* `onChange`: A function that is being when user change one of the fields.
**Function(path, value, formValue)** - **(optional)**
* `onSubmit`: A function that is being invoked when user clicks submit.
**Function(formValue)** - **(optional)**


**Form Options**
* `nestedLevels` - the maximum nesting levels that will be rendered in the form.

**Field Options**
* `_label` - the label/title of the field.
* `_helpText` - the help text/description of the field.
* `_placeholder` - in case of scalars, a placeholder to be displayed.
