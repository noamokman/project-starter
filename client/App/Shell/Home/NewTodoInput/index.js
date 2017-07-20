import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {addTodo} from '../redux';
import {connect} from 'react-redux';
import NewTodoInput from './NewTodoInput';

class NewTodoInputContainer extends Component {
  constructor () {
    super();

    this.state = {
      text: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange ({target: {value}}) {
    this.setState({text: value});
  }

  handleSave ({which, target: {value}}) {
    const text = value.trim();

    if (which !== 13) {
      return;
    }

    if (text.length) {
      this.props.addTodo(text);
      this.setState({text: ''});
    }
  }

  render () {
    return (
      <NewTodoInput
        onSave={this.handleSave}
        onChange={this.handleChange}
        text={this.state.text}
        placeholder='What needs to be done?'
      />
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({addTodo}, dispatch)
)(NewTodoInputContainer);
