import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {compose, withHandlers} from 'recompose';
import AppBar from './AppBar';

export default compose(
  connect(
    null,
    dispatch => bindActionCreators({push: routerActions.push}, dispatch)
  ),
  withHandlers({
    home: ({push}) => () => {
      push('/home');
    }
  })
)(AppBar);