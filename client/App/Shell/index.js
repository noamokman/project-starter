import React from 'react';
import {grey900} from 'material-ui/styles/colors';
import {AppBar, Card} from 'material-ui';

const style = {
  wrapper: {
    height: '100%',
    backgroundColor: grey900,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  card: {
    width: '80%'
  }
};

export default ({children}) => {
  return (
    <div style={style.wrapper}>
      <Card style={style.card}>
        <AppBar title='Welcome to the project-starter' showMenuIconButton={false} />
        {children}
      </Card>
    </div>
  );
};