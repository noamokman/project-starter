import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FILTER_TITLES = {
  all: 'All',
  active: 'Active',
  completed: 'Completed'
};

class FilterLink extends Component {
  constructor () {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    const {filter, onClick} = this.props;

    onClick(filter);
  }

  render () {
    const {filter, selected} = this.props;
    const title = FILTER_TITLES[filter];

    return (
      <a
        className={classnames({selected})}
        style={{cursor: 'pointer'}}
        onClick={this.handleClick}
      >
        {title}
      </a>
    );
  }
}

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default FilterLink;