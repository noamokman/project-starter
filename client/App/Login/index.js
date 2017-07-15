import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {Flex} from 'reflexbox';
import {AppBar} from 'material-ui';
import * as LoginActions from './redux';
import * as AuthActions from '../../reducers/auth';
import Login from './Login';

class LoginContainer extends Component {
  constructor () {
    super();

    this.login = this.login.bind(this);
  }

  componentDidMount () {
    const {auth, loadUser} = this.props;

    if (!auth.token) {
      return;
    }

    loadUser()
      .then(({error}) => {
        if (error) {
          console.log(error);

          return;
        }

        this.redirectBack();
      });
  }

  redirectBack () {
    const {location: {query: {redirect = '/'}}, replace} = this.props;

    replace(redirect);
  }

  login (values) {
    const {localLogin, loadUser} = this.props;

    localLogin(values)
      .then(loadUser)
      .then(() => this.redirectBack());
  }

  render () {
    return (
      <Flex auto column>
        <AppBar title='Project Starter' showMenuIconButton={false} />
        <Login onSubmit={this.login} />
      </Flex>
    );
  }
}

export default connect(
  ({auth}) => ({auth}),
  dispatch => bindActionCreators({...AuthActions, ...LoginActions, replace: routerActions.replace}, dispatch)
)(LoginContainer);
