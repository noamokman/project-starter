import React from 'react';
import TodoItem from './components/TodoItem';
import plur from 'plur';
import {List} from 'material-ui';

export default ({todos, completeTodo, deleteTodo, activeTodos}) => (
  <div>
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </List>
    <span>{activeTodos ? `${activeTodos} ${plur('item', activeTodos)} left` : 'No items left'}</span>
  </div>
);