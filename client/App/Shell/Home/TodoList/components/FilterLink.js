import React, {Component} from 'react';
import {FlatButton, RaisedButton} from 'material-ui';

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

    return (selected ? <RaisedButton onClick={this.handleClick} label={title} /> : <FlatButton onClick={this.handleClick} label={title} />);
  }
}

export default FilterLink;