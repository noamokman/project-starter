import React, {Component} from 'react';
import {TextField} from 'material-ui';

export default class TodoTextInput extends Component {
  constructor () {
    super();
    const {text = ''} = this.props || {};

    this.state = {
      text
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit ({which, target: {value}}) {
    const text = value.trim();

    if (which !== 13) {
      return;
    }

    this.props.onSave(text);

    if (this.props.newTodo) {
      this.setState({text: ''});
    }
  }

  handleChange ({target: {value}}) {
    this.setState({text: value});
  }

  handleBlur ({target: {value}}) {
    if (!this.props.newTodo) {
      this.props.onSave(value);
    }
  }

  render () {
    const {placeholder} = this.props;

    return (
      <TextField
        hintText={placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}