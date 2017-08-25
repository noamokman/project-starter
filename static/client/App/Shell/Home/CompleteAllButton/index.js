import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeAll} from '../redux';
import CompleteAllButton from './CompleteAllButton';

class CompleteAllButtonContainer extends Component {
  constructor () {
    super();

    this.completeAll = this.completeAll.bind(this);
  }

  get checked () {
    return this.props.todos.every(({completed}) => completed);
  }

  completeAll () {
    const {completeAll} = this.props;

    completeAll(!this.checked);
  }

  render () {
    const disabled = !this.props.todos.length;

    return (
      <CompleteAllButton onClick={this.completeAll} checked={this.checked} disabled={disabled} />
    );
  }
}

export default connect(
  ({home: {todos}}) => ({todos}),
  dispatch => bindActionCreators({completeAll}, dispatch)
)(CompleteAllButtonContainer);
