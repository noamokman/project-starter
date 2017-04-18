import {Schema} from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './todo.seed';

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default createSeedModel('Todo', TodoSchema, seed);