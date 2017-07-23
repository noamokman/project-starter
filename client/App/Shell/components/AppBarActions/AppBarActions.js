import React from 'react';
import {IconButton} from 'material-ui';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionHelp from 'material-ui/svg-icons/action/help';
import SocialPerson from 'material-ui/svg-icons/social/person';
import {Flex} from 'reflexbox';

export default ({onLogout, onAbout, onAdmin, admin}) => (
  <Flex auto>
    {
      admin && (
        <IconButton tooltip='Admin' onTouchTap={onAdmin}>
          <SocialPerson color='white' />
        </IconButton>
      )
    }
    <IconButton tooltip='About' onTouchTap={onAbout}>
      <ActionHelp color='white' />
    </IconButton>
    <IconButton tooltip='Logout' onTouchTap={onLogout}>
      <ActionExitToApp color='white' />
    </IconButton>
  </Flex>
);