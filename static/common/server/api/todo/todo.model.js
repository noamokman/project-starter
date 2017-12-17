import {Schema} from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './todo.seed';
import {emitter} from './todo.socket';


const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
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

TodoSchema.post('save', doc => {
  emitter.emit('save', doc);
});

TodoSchema.post('findOneAndUpdate', doc => {
  emitter.emit('findOneAndUpdate', doc);
});

TodoSchema.post('findOneAndRemove', doc => {
  emitter.emit('findOneAndRemove', doc);
});

export default createSeedModel('Todo', TodoSchema, seed);