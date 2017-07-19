import React from 'react';
import AppBarActions from '../AppBarActions';
import {AppBar} from 'material-ui';

export default ({home}) => (
  <AppBar title='Project Starter' onTitleTouchTap={home} showMenuIconButton={false} iconElementRight={<AppBarActions />} />
);