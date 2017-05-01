import React from 'react';
import PropTypes from 'prop-types';
import plur from 'plur';
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

const Footer = ({filter: selectedFilter, onShow, activeCount, completedCount, onClearCompleted}) => (
  <footer className='footer'>
    <span style={style.todoCount}>
      {`${activeCount || 'No'} ${plur('item', activeCount)} left`}
    </span>
    <ul className='filters'>
      {['all', 'active', 'completed'].map(filter =>
        <li key={filter}>
          <FilterLink
            filter={filter}
            onClick={onShow}
            selected={filter === selectedFilter}
          />
        </li>
      )}
    </ul>
    {completedCount ? (
      <button
        className='clear-completed'
        onClick={onClearCompleted}
      >
        {'Clear completed'}
      </button>
    ) : null}
  </footer>
);

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Footer;