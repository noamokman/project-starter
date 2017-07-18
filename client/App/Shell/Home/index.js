import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';
import {Flex} from 'reflexbox';
import {Collapse} from 'react-collapse';

export default () => (
  <Flex auto column align='center' justify='center'>
    <Collapse isOpened>
      <Card>
        <CardTitle title='Todos' />
        <CardText>
          <NewTodoInput />
          <TodoList />
        </CardText>
      </Card>
    </Collapse>
  </Flex>
);