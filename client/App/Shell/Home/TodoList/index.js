import React from 'react';
import TodoItem from './components/TodoItem';
import plur from 'plur';
import {bindActionCreators} from 'redux';
import * as todoActions from '../redux';
import {connect} from 'react-redux';
import {List} from 'material-ui';

const TodoList = ({todos, completeTodo, deleteTodo, visibility}) => {
  const filteredTodos = todos.filter(({completed}) => visibility || !completed)
    .sort(({completed: aCompleted}, {completed: bCompleted}) => aCompleted > bCompleted);
  const completedCount = todos.reduce((count, {completed}) => completed ? count + 1 : count, 0);
  const activeTodos = todos.length - completedCount;

  return (
    <div>
      <List>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
      <span>{`${activeTodos || 'No'} ${plur('item', activeTodos)} left`}</span>
    </div>
  );
};

export default connect(
  ({home}) => home,
  dispatch => bindActionCreators(todoActions, dispatch)
)(TodoList);