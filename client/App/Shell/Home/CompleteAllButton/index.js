import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeAll} from '../redux';
import CompleteAllButton from './CompleteAllButton';

const CompleteAllButtonContainer = ({todos, completeAll}) => {
  const checked = todos.every(({completed}) => completed);

  return (
    <CompleteAllButton onTouchTap={completeAll} checked={checked} />
  );
};

export default connect(
  ({home: {todos}}) => ({todos}),
  dispatch => bindActionCreators({completeAll}, dispatch)
)(CompleteAllButtonContainer);
