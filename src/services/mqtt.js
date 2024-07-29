import mqtt from 'mqtt'; // import namespace "mqtt"

const MQTTClients = {};
const initMQTT = (configObj = {}, options = {}) => {
  // options must have clientId
  const { url, password, username } = configObj;
  const client = mqtt.connect(url, {
    // keepalive: 0,
    // clean: true,
    username,
    password,
    reconnectPeriod: 1000,
    // connectTimeout: 4000,
    ...options,
  });

  MQTTClients.client = client;
  return client;
};
const getMQTTClient = () => {
  return MQTTClients.client;
};

const endMQTT = () => {
  const client = getMQTTClient();
  if (client) {
    client.end();
    MQTTClients.client = null;
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  init: initMQTT,
  client: getMQTTClient,
  end: endMQTT,
};
