import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import AppBar from './AppBar';

class AppBarContainer extends Component {
  constructor () {
    super();

    this.home = this.home.bind(this);
  }

  home () {
    this.props.push('/home');
  }

  render () {
    return (
      <AppBar home={this.home} />
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({push: routerActions.push}, dispatch)
)(AppBarContainer);