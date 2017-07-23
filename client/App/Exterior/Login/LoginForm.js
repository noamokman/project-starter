import {reduxForm} from 'redux-form';
import {isValid} from 'email-address';
import Login from './Login';

const validate = values => {
  const errors = ['email', 'password'].reduce((acc, field) => !values[field] ? {...acc, [field]: 'Required'} : acc, {});

  if (values.email && !isValid(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);