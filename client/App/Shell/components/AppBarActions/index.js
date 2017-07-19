import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {routerActions} from 'react-router-redux';
import {logout} from '../../../../reducers/auth';
import AppBarActions from './AppBarActions';

class AppBarActionsContainer extends Component {
  constructor () {
    super();

    this.about = this.about.bind(this);
  }

  about () {
    this.props.push('/about');
  }

  render () {
    const {logout} = this.props;

    return (
      <AppBarActions logout={logout} about={this.about} />
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({logout, push: routerActions.push}, dispatch)
)(AppBarActionsContainer);