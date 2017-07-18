import React from 'react';
import {IconButton} from 'material-ui';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

export default ({logout}) => (
  <IconButton tooltip='Logout' onTouchTap={logout}>
    <ActionExitToApp />
  </IconButton>
);