import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500} from 'material-ui/styles/colors';
import {Flex} from 'reflexbox';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500
  }
});

export default ({children}) => {
  let devTools = null;

  if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
    const DevTools = require('../components/DevTools').default;

    devTools = <DevTools />;
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Flex auto>
        {children}
        {devTools}
      </Flex>
    </MuiThemeProvider>
  );
};