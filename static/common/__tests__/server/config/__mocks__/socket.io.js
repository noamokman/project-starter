import _ from 'lodash';

const instance = {
  use: _.noop,
  on: _.noop,
  sockets: {
    connected: {}
  }
};

export const __setConnectedSockets = connected => {
  instance.sockets.connected = connected;
};

export default () => instance;