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
  }

  handleSubmit ({which, target: {value}}) {
    const text = value.trim();

    if (which !== 13) {
      return;
    }

    this.props.onSave(text);
    this.setState({text: ''});
  }

  handleChange ({target: {value}}) {
    this.setState({text: value});
  }

  render () {
    const {placeholder} = this.props;

    return (
      <TextField
        hintText={placeholder}
        value={this.state.text}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}