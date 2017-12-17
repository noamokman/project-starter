import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, mapProps} from 'recompose';
import {clearCompleted} from '../redux';
import ClearCompletedButton from './ClearCompletedButton';

export default compose(
  connect(
    ({home: {todos}}) => ({todos}),
    dispatch => bindActionCreators({clearCompleted}, dispatch)
  ),
  mapProps(({todos, clearCompleted}) => ({
    disabled: !todos.some(({completed}) => completed),
    onClick: clearCompleted
  }))
)(ClearCompletedButton);
