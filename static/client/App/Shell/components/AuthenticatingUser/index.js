import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {socketConnect} from 'redux-sockets';
import {compose, lifecycle, renderNothing} from 'recompose';
import {loadUser, authorize} from '../../../../reducers/auth';

export default compose(
  connect(
    null,
    dispatch => bindActionCreators({loadUser, authorize, socketConnect}, dispatch)
  ),
  lifecycle({
    componentDidMount () {
      const {loadUser, authorize, socketConnect} = this.props;

      loadUser()
        .then(socketConnect)
        .then(authorize);
    }
  })
)(renderNothing());
