import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';
import DevTools from '../components/DevTools';
import {Flex} from 'reflexbox';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500
  }
});

export default ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Flex auto>
      {children}
      {window.devToolsExtension ? null : <DevTools />}
    </Flex>
  </MuiThemeProvider>
);