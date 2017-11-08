import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {socketConnect} from 'redux-sockets';
import {loadUser, authorize} from '../../../../reducers/auth';

class AuthenticatingUser extends Component {
  componentDidMount () {
    const {loadUser, authorize, socketConnect} = this.props;

    loadUser()
      .then(socketConnect)
      .then(authorize);
  }

  // eslint-disable-next-line class-methods-use-this, lodash/prefer-constant
  render () {
    return null;
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({loadUser, authorize, socketConnect}, dispatch)
)(AuthenticatingUser);
