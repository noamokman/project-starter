import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Card, CardTitle, CardText, CardActions, FlatButton, AppBar} from 'material-ui';
import {Flex} from 'reflexbox';
import Layout from '../components/Layout';
import TextField from './components/TextField';

const Login = ({handleSubmit}) => (
  <Layout>
    <AppBar title='Project Starter' showMenuIconButton={false} />
    <Flex auto column align='center' justify='center'>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardTitle title='Login' />
          <CardText>
            <Flex column>
              <Field name={'email'} component={TextField} label='Email' />
              <Field name={'password'} component={TextField} type={'password'} label='Password' />
            </Flex>
          </CardText>
          <CardActions>
            <FlatButton type='submit' label='Lets go!' primary />
            <FlatButton label='Not a user?' secondary />
          </CardActions>
        </Card>
      </form>
    </Flex>
  </Layout>
);

const validate = values => {
  const errors = ['email', 'password'].reduce((acc, field) => {
    return !values[field] ? {...acc, [field]: 'Required'} : acc;
  }, {});

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(Login);
