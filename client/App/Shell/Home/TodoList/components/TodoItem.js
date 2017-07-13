import React, {Component} from 'react';
import {Checkbox, IconButton} from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TodoTextInput from '../../components/TodoTextInput/index';
import {Flex} from 'reflexbox';

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
      <Flex>
        <Checkbox
          label={text}
          checked={completed}
          onCheck={this.handleComplete}
          onDoubleClick={this.handleDoubleClick}
        />
        <IconButton tooltip='Delete' onClick={this.handleDelete}>
          <ActionDelete />
        </IconButton>
      </Flex>
    );
  }
}