import React from 'react';
import {Flex} from 'reflexbox';
import {AppBar} from 'material-ui';

export default ({children}) => (
  <Flex auto column>
    <AppBar title='Project Starter' showMenuIconButton={false} />
    {children}
  </Flex>
);