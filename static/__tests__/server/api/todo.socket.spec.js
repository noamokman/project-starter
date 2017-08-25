import todoSocket, {emitter} from '../../../server/api/todo/todo.socket';
import EventEmitter from 'events';

const socket = {emit: jest.fn()};
const getSockets = (filter = () => true) => {
  filter('id');

  return [socket];
};

describe('Todo socket', () => {
  describe('exports', () => {
    it('should expose default function', () => {
      expect(typeof todoSocket).toBe('function');
    });

    it('should expose an event emitter', () => {
      expect(emitter).toBeInstanceOf(EventEmitter);
    });
  });

  describe('socket function', () => {
    it('should listen on events', () => {
      todoSocket(getSockets);

      expect(emitter._events).toHaveProperty('save');
      expect(emitter._events).toHaveProperty('findOneAndUpdate');
      expect(emitter._events).toHaveProperty('findOneAndRemove');
      expect(emitter._events).toHaveProperty('completeAll');
      expect(emitter._events).toHaveProperty('clearCompleted');
    });
  });

  describe('events', () => {
    const doc = {user: {equals: id => id === 'id'}, text: 'test', completed: true};

    beforeEach(() => {
      socket.emit.mockClear();
    });

    it('should handle save event', () => {
      emitter.emit('save', doc);

      expect(socket.emit).toHaveBeenCalledWith('TODO_SAVE', doc);
    });

    it('should handle findOneAndUpdate event', () => {
      emitter.emit('findOneAndUpdate', doc);

      expect(socket.emit).toHaveBeenCalledWith('TODO_UPDATE', doc);
    });

    it('should handle findOneAndRemove event', () => {
      emitter.emit('findOneAndRemove', doc);

      expect(socket.emit).toHaveBeenCalledWith('TODO_DELETE', doc);
    });

    it('should handle completeAll event', () => {
      emitter.emit('completeAll', doc);

      expect(socket.emit).toHaveBeenCalledWith('TODO_COMPLETE_ALL', {completed: true});
    });

    it('should handle clearCompleted event', () => {
      emitter.emit('clearCompleted', doc);

      expect(socket.emit).toHaveBeenCalledWith('TODO_CLEAR_COMPLETED');
    });
  });
});