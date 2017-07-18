import React, {Component} from 'react';
import {Checkbox, IconButton, ListItem} from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';

export default class TodoItem extends Component {
  constructor () {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderCheckBox = this.renderCheckBox.bind(this);
  }

  handleDelete () {
    const {todo: {id}, deleteTodo} = this.props;

    deleteTodo(id);
  }

  handleComplete () {
    const {todo: {id}, completeTodo} = this.props;

    completeTodo(id);
  }

  renderDeleteButton () {
    return (
      <IconButton tooltip='Delete' onTouchTap={this.handleDelete}>
        <ActionDelete />
      </IconButton>
    );
  }

  renderCheckBox () {
    const {todo: {completed}} = this.props;

    return (
      <Checkbox
        checked={completed}
        onCheck={this.handleComplete}
      />
    );
  }

  render () {
    const {todo: {text}} = this.props;

    return (
      <ListItem primaryText={text} leftCheckbox={this.renderCheckBox()} rightIconButton={this.renderDeleteButton()} />
    );
  }
}