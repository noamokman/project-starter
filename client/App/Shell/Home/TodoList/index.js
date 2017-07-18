import React, {Component} from 'react';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import {bindActionCreators} from 'redux';
import * as todoActions from '../redux';
import {connect} from 'react-redux';
import {Checkbox, List} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class TodoList extends Component {
  constructor () {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.renderToggleAll = this.renderToggleAll.bind(this);
  }

  handleShow (filter) {
    this.props.setFilter(filter);
  }

  renderToggleAll (completedCount) {
    const {todos: {length}, completeAll} = this.props;

    if (!length) {
      return;
    }

    return (
      <Checkbox
        checkedIcon={<ActionFavorite />}
        uncheckedIcon={<ActionFavoriteBorder />}
        checked={completedCount === length}
        label='Toggle all'
        onCheck={completeAll}
      />
    );
  }

  render () {
    const {todos, completeTodo, deleteTodo, clearCompleted, filter} = this.props;

    const todoFilters = {
      all: () => true,
      active: ({completed}) => !completed,
      completed: ({completed}) => completed
    };

    const filteredTodos = todos.filter(todoFilters[filter]);
    const completedCount = todos.reduce((count, {completed}) => completed ? count + 1 : count, 0);

    return (
      <div>
        {this.renderToggleAll(completedCount)}
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
            onShow={this.handleShow}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(
  ({home}) => home,
  dispatch => bindActionCreators(todoActions, dispatch)
)(TodoList);