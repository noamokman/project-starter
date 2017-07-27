import React from 'react';
import TodoItem from './components/TodoItem';
import plur from 'plur';
import {List} from 'material-ui';
import styled from 'styled-components';
import {Flex} from 'reflexbox';

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
            key={todo.id}
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