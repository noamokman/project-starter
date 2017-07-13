import React, {Component} from 'react';
import TodoTextInput from '../../components/TodoTextInput/index';

export default class TodoItem extends Component {
  constructor () {
    super();
    const {editing = false} = this.props || {};

    this.state = {
      editing
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleDoubleClick () {
    this.setState({editing: true});
  }

  handleSave (text) {
    const {todo: {id}, deleteTodo, editTodo} = this.props;

    if (text.length) {
      editTodo(id, text);
    }
    else {
      deleteTodo(id);
    }

    this.setState({editing: false});
  }

  handleDelete () {
    const {todo: {id}, deleteTodo} = this.props;

    deleteTodo(id);
  }

  handleComplete () {
    const {todo: {id}, completeTodo} = this.props;

    completeTodo(id);
  }

  render () {
    const {todo: {completed, text}} = this.props;
    const {editing} = this.state;


    if (editing) {
      return (
        <TodoTextInput
          text={text}
          editing={editing}
          onSave={this.handleSave}
        />
      );
    }

    return (
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={completed}
          onChange={this.handleComplete}
        />
        <label onDoubleClick={this.handleDoubleClick}>
          {text}
        </label>
        <button
          className='destroy'
          onClick={this.handleDelete}
        />
      </div>
    );
  }
}