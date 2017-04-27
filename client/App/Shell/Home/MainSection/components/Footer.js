import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../redux';
import FilterLink from './FilterLink';

const style = {
  todoCount: {
    float: 'left',
    textAlign: 'left'
  },
  clearCompleted: {
    float: 'right',
    position: 'relative',
    lineHeight: '20px',
    textDecoration: 'none',
    cursor: 'pointer'
  }
};

export default class Footer extends Component {
  constructor () {
    super();

    this.renderClearButton = this.renderClearButton.bind(this);
    this.renderTodoCount = this.renderTodoCount.bind(this);
  }

  renderTodoCount () {
    const {activeCount} = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span style={style.todoCount}>
        {activeCount || 'No'} {itemWord} {'left'}
      </span>
    );
  }

  renderClearButton () {
    const {completedCount, onClearCompleted} = this.props;

    if (completedCount > 0) {
      return (
        <button
          className='clear-completed'
          onClick={onClearCompleted}
        >
          {'Clear completed'}
        </button>
      );
    }
  }

  render () {
    const {filter: selectedFilter, onShow} = this.props;

    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              <FilterLink
                filter={filter}
                onClick={onShow}
                selected={filter === selectedFilter}
              />
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};