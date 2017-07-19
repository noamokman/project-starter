import React from 'react';
import {IconButton} from 'material-ui';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionHelp from 'material-ui/svg-icons/action/help';
import {Flex} from 'reflexbox';

export default ({logout, about}) => (
  <Flex auto>
    <IconButton tooltip='About' onTouchTap={about}>
      <ActionHelp color='white' />
    </IconButton>
    <IconButton tooltip='Logout' onTouchTap={logout}>
      <ActionExitToApp color='white' />
    </IconButton>
  </Flex>
);