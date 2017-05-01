import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {CardTitle, CardText, CardActions, FlatButton} from 'material-ui';
import TextField from './components/TextField';

const Login = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <CardTitle title={'Login'} />
    <CardText>
      <Field name={'email'} component={TextField} label={'Email'} />
      <Field name={'password'} component={TextField} type={'password'} label={'Password'} />
    </CardText>
    <CardActions>
      <FlatButton label={'Not a user?'} />
      <FlatButton type='submit' label={'Lets go!'} secondary />
    </CardActions>
  </form>
);

const validate = values => {
  const errors = {};
  const fields = ['email', 'password'];

  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);
