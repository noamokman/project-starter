import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {compose, withHandlers, mapProps} from 'recompose';
import {logout} from '../../../../reducers/auth';
import AppBarActions from './AppBarActions';

export default compose(
  connect(
    ({auth: {user}}) => ({user}),
    dispatch => bindActionCreators({logout, push: routerActions.push}, dispatch)
  ),
  withHandlers({
    onAbout: ({push}) => () => {
      push('/about');
    },
    onAdmin: ({push}) => () => {
      push('/admin');
    }
  }),
  mapProps(({onAbout, onAdmin, logout, user = {}}) => ({onAbout, onAdmin, admin: user.admin, onLogout: logout}))
)(AppBarActions);
