import {reduxForm} from 'redux-form';
import Login from './Login';

const validate = values => {
  const errors = ['email', 'password'].reduce((acc, field) => !values[field] ? {...acc, [field]: 'Required'} : acc, {});

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);