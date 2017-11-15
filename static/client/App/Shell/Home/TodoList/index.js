import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose, mapProps, lifecycle} from 'recompose';
import * as todoActions from '../redux';
import TodoList from './TodoList';

export default compose(
  connect(
    ({home}) => home,
    dispatch => bindActionCreators(todoActions, dispatch)
  ),
  lifecycle({
    componentDidMount () {
      const {loadTodos, loaded} = this.props;

      if (!loaded) {
        loadTodos();
      }
    }
  }),
  mapProps(({todos, completeTodo, deleteTodo, visibility}) => {
    const filteredTodos = todos.filter(({completed}) => visibility || !completed)
      .sort((a, b) => a.completed > b.completed);
    const activeTodos = todos.reduce((count, {completed}) => !completed ? count + 1 : count, 0);

    return ({
      todos: filteredTodos,
      activeTodos,
      completeTodo,
      deleteTodo
    });
  })
)(TodoList);