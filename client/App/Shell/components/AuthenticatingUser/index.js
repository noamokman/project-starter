import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../../../reducers/auth';

class AuthenticatingUser extends Component {
  componentDidMount () {
    const {loadUser} = this.props;

    loadUser();
  }

  // eslint-disable-next-line class-methods-use-this
  render () {
    return null;
  }
}

export default connect(
  null,
  dispatch => bindActionCreators(authActions, dispatch)
)(AuthenticatingUser);
