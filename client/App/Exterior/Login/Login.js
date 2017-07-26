import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {Field} from 'redux-form';
import {Card, CardTitle, CardText, CardActions, FlatButton} from 'material-ui';
import {Flex} from 'reflexbox';
import TextField from './components/TextField';

export default ({handleSubmit, loginError, clearError}) => (
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
        </CardActions>
      </Card>
      {loginError && <Snackbar open message={loginError} onRequestClose={clearError} autoHideDuration={4000} />}
    </form>
  </Flex>
);
