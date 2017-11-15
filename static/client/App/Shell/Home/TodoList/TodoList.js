import React from 'react';
import plur from 'plur';
import {List} from 'material-ui';
import styled from 'styled-components';
import {Flex} from 'reflexbox';
import TodoItem from './TodoItem';

const ScrollableDiv = styled(Flex)
  .attrs({column: true})`
    overflow-y: auto;
    max-height: 50vh;
`;

export default ({todos, completeTodo, deleteTodo, activeTodos}) => (
  <div>
    <List>
      <ScrollableDiv>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ScrollableDiv>
    </List>
    <span>{activeTodos ? `${activeTodos} ${plur('item', activeTodos)} left` : 'No items left'}</span>
  </div>
);