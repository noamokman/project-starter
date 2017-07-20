import React from 'react';
import {TextField} from 'material-ui';

export default ({placeholder, text, onChange, onSave}) => (
  <TextField
    hintText={placeholder}
    value={text}
    onChange={onChange}
    onKeyDown={onSave}
  />
);