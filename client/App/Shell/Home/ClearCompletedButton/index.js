import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearCompleted} from '../redux';
import ClearCompletedButton from './ClearCompletedButton';

const ClearCompletedButtonContainer = ({todos, clearCompleted}) => {
  const disabled = !todos.some(({completed}) => completed);

  return (
    <ClearCompletedButton disabled={disabled} onClick={clearCompleted} />
  );
};

export default connect(
  ({home: {todos}}) => ({todos}),
  dispatch => bindActionCreators({clearCompleted}, dispatch)
)(ClearCompletedButtonContainer);
