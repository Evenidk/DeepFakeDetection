const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-next-app',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

