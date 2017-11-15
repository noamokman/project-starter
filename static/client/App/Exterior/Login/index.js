import {bindActionCreators} from 'redux';
import {compose, lifecycle, withHandlers, mapProps} from 'recompose';
import {connect} from 'react-redux';
import {socketConnect} from 'redux-sockets';
import {localLogin, loadUser, authorize} from '../../../reducers/auth';
import {clearError} from './redux';
import LoginForm from './LoginForm';

export default compose(
  connect(
    ({auth: {token}, login: {error}}) => ({token, error}),
    dispatch => bindActionCreators({localLogin, authorize, loadUser, socketConnect, clearError}, dispatch)
  ),
  lifecycle({
    componentDidMount () {
      const {token, loadUser, authorize, socketConnect} = this.props;

      if (!token) {
        return;
      }

      loadUser()
        .then(socketConnect)
        .then(authorize);
    }
  }),
  withHandlers({
    onSubmit: ({localLogin, authorize, loadUser, socketConnect}) => values => {
      localLogin(values)
        .then(loadUser)
        .then(socketConnect)
        .then(authorize);
    }
  }),
  mapProps(({clearError, error, onSubmit}) => ({clearError, loginError: error, onSubmit}))
)(LoginForm);
