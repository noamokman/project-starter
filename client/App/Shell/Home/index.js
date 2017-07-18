import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';
import {Flex} from 'reflexbox';

export default () => (
  <Flex auto column align='center' justify='center'>
    <Card>
      <CardTitle title='Todos' />
      <CardText>
        <NewTodoInput />
        <TodoList />
      </CardText>
    </Card>
  </Flex>
);