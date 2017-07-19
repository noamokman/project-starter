import React from 'react';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import {bindActionCreators} from 'redux';
import * as todoActions from '../redux';
import {connect} from 'react-redux';
import {List} from 'material-ui';

const TodoList = ({todos, completeTodo, deleteTodo, clearCompleted, filter, setFilter}) => {
  const todoFilters = {
    all: () => true,
    active: ({completed}) => !completed,
    completed: ({completed}) => completed
  };

  const filteredTodos = todos.filter(todoFilters[filter]);
  const completedCount = todos.reduce((count, {completed}) => completed ? count + 1 : count, 0);

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
      {todos.length ? (
        <Footer
          completedCount={completedCount}
          activeCount={todos.length - completedCount}
          filter={filter}
          onClearCompleted={clearCompleted}
          onShow={setFilter}
        />
      ) : null}
    </div>
  );
};

export default connect(
  ({home}) => home,
  dispatch => bindActionCreators(todoActions, dispatch)
)(TodoList);