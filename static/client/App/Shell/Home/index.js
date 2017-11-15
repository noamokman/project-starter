import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui';
import {Flex, Box} from 'reflexbox';
import {Collapse} from 'react-collapse';
import styled from 'styled-components';
import NewTodoInput from './NewTodoInput';
import TodoList from './TodoList';
import CompleteAllButton from './CompleteAllButton';
import ToggleVisibilityButton from './ToggleVisibilityButton';
import ClearCompletedButton from './ClearCompletedButton';

const Title = styled(CardTitle)
  .attrs({
    title: 'Todos'
  })`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <Flex auto column align='center' justify='center'>
    <Box w={1 / 3}>
      <Collapse isOpened>
        <Card>
          <Title>
            <div>
              <ToggleVisibilityButton />
              <CompleteAllButton />
              <ClearCompletedButton />
            </div>
          </Title>
          <CardText>
            <NewTodoInput />
            <TodoList />
          </CardText>
        </Card>
      </Collapse>
    </Box>
  </Flex>
);