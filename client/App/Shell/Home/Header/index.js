import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from '../../components/TodoTextInput';

class Header extends Component {
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
      <header className='header'>
        <h1>{'todos'}</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder='What needs to be done?'
        />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
