import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {compose, mapProps} from 'recompose';
import {toggleVisibility} from '../redux';
import ToggleVisibilityButton from './ToggleVisibilityButton';

export default compose(
  connect(
    ({home: {visibility}}) => ({visibility}),
    dispatch => bindActionCreators({toggleVisibility}, dispatch)
  ),
  mapProps(({visibility, toggleVisibility}) => ({onClick: toggleVisibility, visibility}))
)(ToggleVisibilityButton);
