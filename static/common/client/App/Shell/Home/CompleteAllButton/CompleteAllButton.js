import React from 'react';
import {blue500} from 'material-ui/styles/colors';
import {IconButton} from 'material-ui';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';

export default ({checked, disabled, onClick}) => (
  <IconButton tooltip={checked ? 'Mark all unchecked' : 'Mark all checked'} disabled={disabled} onClick={onClick}>
    <ActionDoneAll color={checked ? blue500 : null} />
  </IconButton>
);