import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../redux';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

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
    this.renderFilterLink = this.renderFilterLink.bind(this);
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

  renderFilterLink (filter) {
    const title = FILTER_TITLES[filter];
    const {filter: selectedFilter, onShow} = this.props;

    return (
      <a
        className={classnames({selected: filter === selectedFilter})}
        style={{cursor: 'pointer'}}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
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
    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
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