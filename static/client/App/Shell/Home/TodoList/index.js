import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose, mapProps, lifecycle} from 'recompose';
import {completeTodo, deleteTodo, loadTodos} from '../redux';
import TodoList from './TodoList';

export default compose(
  connect(
    ({home}) => home,
    dispatch => bindActionCreators({loadTodos, completeTodo, deleteTodo}, dispatch)
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
    const activeTodos = todos.reduce((count, {completed}) => count + !completed, 0);

    return ({
      todos: filteredTodos,
      activeTodos,
      completeTodo,
      deleteTodo
    });
  })
)(TodoList);