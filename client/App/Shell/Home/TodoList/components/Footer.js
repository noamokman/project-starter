import React from 'react';
import plur from 'plur';
import {RaisedButton} from 'material-ui';
import FilterLink from './FilterLink';
import {Flex} from 'reflexbox';

export default ({filter: selectedFilter, onShow, activeCount, completedCount, onClearCompleted}) => (
  <Flex column auto>
    <span>{`${activeCount || 'No'} ${plur('item', activeCount)} left`}</span>
    <Flex auto>
      {
        ['all', 'active', 'completed'].map(filter => (
          <div key={filter}>
            <FilterLink
              filter={filter}
              onClick={onShow}
              selected={filter === selectedFilter}
            />
          </div>
        ))
      }
    </Flex>
    {completedCount ? (<RaisedButton onClick={onClearCompleted} label='Clear Completed' />) : null}
  </Flex>
);