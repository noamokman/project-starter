import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../redux';
import TodoList from './TodoList';

class TodoListContainer extends Component {
  componentDidMount () {
    const {loadTodos, loaded} = this.props;

    if (!loaded) {
      loadTodos();
    }
  }

  render () {
    const {todos, completeTodo, deleteTodo, visibility} = this.props;
    const filteredTodos = todos.filter(({completed}) => visibility || !completed)
      .sort(({completed: aCompleted}, {completed: bCompleted}) => aCompleted > bCompleted);
    const activeTodos = todos.reduce((count, {completed}) => !completed ? count + 1 : count, 0);

    return (
      <TodoList todos={filteredTodos} completeTodo={completeTodo} deleteTodo={deleteTodo} activeTodos={activeTodos} />
    );
  }
}

export default connect(
  ({home}) => home,
  dispatch => bindActionCreators(todoActions, dispatch)
)(TodoListContainer);