import React from 'react';
import {IconButton} from 'material-ui';
import ActionClearAll from 'material-ui/svg-icons/communication/clear-all';

export default ({onClick, disabled}) => (
  <IconButton tooltip={'Clear Completed'} disabled={disabled} onClick={onClick}>
    <ActionClearAll />
  </IconButton>
);