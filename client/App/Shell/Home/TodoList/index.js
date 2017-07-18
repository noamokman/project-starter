import React, {Component} from 'react';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';
import {bindActionCreators} from 'redux';
import * as todoActions from '../redux';
import {connect} from 'react-redux';
import {Checkbox, List, ListItem} from 'material-ui';

class TodoList extends Component {
  constructor () {
    super();

    this.renderToggleAll = this.renderToggleAll.bind(this);
  }

  renderToggleAll (completedCount) {
    const {todos: {length}, completeAll} = this.props;

    if (!length) {
      return;
    }

    const checkBox = (
      <Checkbox
        checked={completedCount === length}
        onCheck={completeAll}
      />
    );

    return (
      <ListItem primaryText={'Complete All'} leftCheckbox={checkBox} />
    );
  }

  render () {
    const {todos, completeTodo, deleteTodo, clearCompleted, filter, setFilter} = this.props;

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
          {this.renderToggleAll(completedCount)}
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
  }
}

export default connect(
  ({home}) => home,
  dispatch => bindActionCreators(todoActions, dispatch)
)(TodoList);