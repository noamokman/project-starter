import React from 'react';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';

export default () => (
  <div>
    <h1>{'todos'}</h1>
    <NewTodoInput />
    <TodoList />
  </div>
);