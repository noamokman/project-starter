import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {addTodo} from '../TodoList/redux';
import {connect} from 'react-redux';
import TodoTextInput from '../components/TodoTextInput';

class NewTodoInput extends Component {
  constructor () {
    super();

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave (text) {
    if (text.length) {
      this.props.addTodo(text);
    }
  }

  render () {
    return (
      <TodoTextInput
        onSave={this.handleSave}
        placeholder='What needs to be done?'
      />
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({addTodo}, dispatch)
)(NewTodoInput);
