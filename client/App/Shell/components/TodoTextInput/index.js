import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

    if (which === 13) {
      this.props.onSave(text);

      if (this.props.newTodo) {
        this.setState({text: ''});
      }
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
    const {editing, newTodo, placeholder} = this.props;

    return (
      <input
        className={
          classnames({
            edit: editing,
            'new-todo': newTodo
          })}
        type='text'
        placeholder={placeholder}
        autoFocus='true'
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
};