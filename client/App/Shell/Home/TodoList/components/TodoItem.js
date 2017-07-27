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
    const {todo: {_id}, deleteTodo} = this.props;

    deleteTodo(_id);
  }

  handleComplete () {
    const {todo: {_id, completed}, completeTodo} = this.props;

    completeTodo(_id, !completed);
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