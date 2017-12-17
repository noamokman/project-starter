import React from 'react';
import {Checkbox, ListItem} from 'material-ui';
import {compose, withHandlers, mapProps} from 'recompose';
import TodoItemDeleteButton from './TodoItemDeleteButton';

export default compose(
  withHandlers({
    onCheck: ({todo: {_id, completed}, completeTodo}) => () => {
      completeTodo(_id, !completed);
    },
    onDelete: ({todo: {_id}, deleteTodo}) => () => {
      deleteTodo(_id);
    }
  }),
  mapProps(({todo: {text, completed}, onCheck, onDelete}) => ({
    primaryText: text,
    leftCheckbox: <Checkbox checked={completed} onCheck={onCheck} />,
    rightIconButton: <TodoItemDeleteButton onClick={onDelete} />
  }))
)(ListItem);