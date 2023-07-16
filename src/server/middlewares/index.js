const loggingMiddleware = require('./loggingMiddleware');

const applyMiddlwares = (server, app) => {
  server.use(loggingMiddleware(app.db.logging));
  return server;
};

module.exports = applyMiddlwares;
