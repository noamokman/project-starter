export default {
  __clients: [],
  __clear () {
    this.__clients = [];
  },
  create () {
    const client = {
      requests: [],
      request () {
        let config = {headers: {}};

        this.interceptors.request.values.forEach(value => {
          config = value(config);
        });

        this.requests.push(config);

        return Promise.resolve();
      },
      interceptors: {
        request: {
          values: [],
          use (req) {
            this.values.push(req);
          }
        }
      }
    };

    this.__clients.push(client);

    return client;
  }
};