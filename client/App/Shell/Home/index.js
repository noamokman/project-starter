import React from 'react';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';
import {Flex} from 'reflexbox';

export default () => (
  <Flex auto column align='center' justify='center'>
    <h1>{'Todos'}</h1>
    <NewTodoInput />
    <TodoList />
  </Flex>
);