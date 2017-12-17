import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, withHandlers, mapProps} from 'recompose';
import {completeAll} from '../redux';
import CompleteAllButton from './CompleteAllButton';

const calculateChecked = todos => todos.every(({completed}) => completed);

export default compose(
  connect(
    ({home: {todos}}) => ({todos}),
    dispatch => bindActionCreators({completeAll}, dispatch)
  ),
  withHandlers({
    onClick: ({completeAll, todos}) => () => {
      completeAll(!calculateChecked(todos));
    }
  }),
  mapProps(({todos, onClick}) => ({
    onClick,
    disabled: !todos.length,
    checked: calculateChecked(todos)
  }))
)(CompleteAllButton);
