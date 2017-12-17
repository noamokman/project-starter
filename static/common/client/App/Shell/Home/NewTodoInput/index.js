import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {compose, withHandlers, withState, mapProps} from 'recompose';
import {TextField} from 'material-ui';
import {addTodo} from '../redux';

export default compose(
  connect(
    null,
    dispatch => bindActionCreators({addTodo}, dispatch)
  ),
  withState('text', 'updateText', ''),
  withHandlers({
    onChange: ({updateText}) => ({target: {value}}) => {
      updateText(value);
    },
    onSave: ({updateText, addTodo}) => ({which, target: {value}}) => {
      const text = value.trim();

      if (which !== 13 || !text.length) {
        return;
      }

      addTodo(text);
      updateText('');
    }
  }),
  mapProps(({text, onSave, onChange}) => ({
    hintText: 'What needs to be done?',
    value: text,
    onChange,
    onKeyDown: onSave
  }))
)(TextField);
