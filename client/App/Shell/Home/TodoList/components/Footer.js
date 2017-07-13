import React from 'react';
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

export default ({filter: selectedFilter, onShow, activeCount, completedCount, onClearCompleted}) => (
  <footer className='footer'>
    <span style={style.todoCount}>
      {`${activeCount || 'No'} ${plur('item', activeCount)} left`}
    </span>
    <div className='filters'>
      {['all', 'active', 'completed'].map(filter =>
        (<div key={filter}>
          <FilterLink
            filter={filter}
            onClick={onShow}
            selected={filter === selectedFilter}
          />
        </div>)
      )}
    </div>
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