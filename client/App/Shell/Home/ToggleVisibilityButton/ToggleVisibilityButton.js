import React from 'react';
import {IconButton} from 'material-ui';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';

export default ({onTouchTap, visibility}) => (
  <IconButton tooltip={visibility ? 'Show Active' : 'Show All'} onTouchTap={onTouchTap}>
    {visibility ? <ActionVisibilityOff /> : <ActionVisibility />}
  </IconButton>
);