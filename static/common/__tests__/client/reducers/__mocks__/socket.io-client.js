export const socket = {
  events: [],
  on (name, callback) {
    if (name === 'connect') {
      return callback();
    }
  },

  emit (name, data) {
    this.events.push({name, data});
  }
};
export default () => socket;