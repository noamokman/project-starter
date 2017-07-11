import React, {Component} from 'react';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import {bindActionCreators} from 'redux';
import * as TodoActions from './redux';
import {connect} from 'react-redux';

class TodoList extends Component {
  constructor () {
    super();

    const {filter = 'all'} = this.props || {};

    this.state = {
      filter
    };

    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.renderToggleAll = this.renderToggleAll.bind(this);
  }

  handleClearCompleted () {
    this.props.clearCompleted();
  }

  handleShow (filter) {
    this.setState({filter});
  }

  renderToggleAll (completedCount) {
    const {todos: {length}, completeAll} = this.props;

    if (!length) {
      return;
    }

    return (
      <input
        className='toggle-all'
        type='checkbox'
        checked={completedCount === length}
        onChange={completeAll}
      />
    );
  }

  render () {
    const {todos, completeTodo, deleteTodo, editTodo} = this.props;
    const {filter} = this.state;

    const todoFilters = {
      all: () => true,
      active: ({completed}) => !completed,
      completed: ({completed}) => completed
    };

    const filteredTodos = todos.filter(todoFilters[filter]);
    const completedCount = todos.reduce((count, {completed}) =>
      completed ? count + 1 : count,
    0
    );

    return (
      <section className='main'>
        {this.renderToggleAll(completedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
          )}
        </ul>
        {todos.length ? (
          <Footer
            completedCount={completedCount}
            activeCount={todos.length - completedCount}
            filter={filter}
            onClearCompleted={this.handleClearCompleted}
            onShow={this.handleShow}
          />
        ) : null}
      </section>
    );
  }
}

export default connect(
  ({todos}) => ({todos}),
  dispatch => (bindActionCreators(TodoActions, dispatch))
)(TodoList);