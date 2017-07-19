import React from 'react';
import {blue500} from 'material-ui/styles/colors';
import {IconButton} from 'material-ui';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';

export default ({checked, onTouchTap}) => (
  <IconButton tooltip={checked ? 'Mark all unchecked' : 'Mark all checked'} onTouchTap={onTouchTap}>
    <ActionDoneAll color={checked ? blue500 : null} />
  </IconButton>
);