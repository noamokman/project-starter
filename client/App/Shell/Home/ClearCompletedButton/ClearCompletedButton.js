import React from 'react';
import {IconButton} from 'material-ui';
import ActionClearAll from 'material-ui/svg-icons/communication/clear-all';

export default ({onTouchTap, disabled}) => (
  <IconButton tooltip={'Clear Completed'} disabled={disabled} onTouchTap={onTouchTap}>
    <ActionClearAll />
  </IconButton>
);