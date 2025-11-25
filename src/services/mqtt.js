import mqtt from "mqtt";
import config from "#config/index.js";
import * as sensorData from "#services/sensorData.js";
import logger from "#utils/logger.js";

let client = null;
let connected = false;

export function connect() {
  const mqttOptions = {
    host: config.mqtt.host,
    port: config.mqtt.port,
    username: config.mqtt.username,
    password: config.mqtt.password,
    protocol: config.mqtt.protocol,
    reconnectPeriod: config.mqtt.reconnectPeriod,
    connectTimeout: config.mqtt.connectTimeout,
  };

  client = mqtt.connect(mqttOptions);

  client.on("connect", () => {
    connected = true;
    logger.info("MQTT connected successfully");
    subscribe(config.mqtt.topic);
  });

  client.on("error", (err) => {
    connected = false;
    logger.error(`MQTT connection error: ${err.message}`);
  });

  client.on("reconnect", () => {
    logger.warn("MQTT attempting to reconnect...");
  });

  client.on("offline", () => {
    connected = false;
    logger.warn("MQTT client is offline");
  });

  client.on("close", () => {
    connected = false;
    logger.warn("MQTT connection closed");
  });

  client.on("message", (topic, message) => {
    try {
      sensorData.onMqttMessage(topic, message);
    } catch (err) {
      logger.error(`Error in message handler: ${err.message}`);
    }
  });
}

function subscribe(topic) {
  if (!client) {
    logger.error("MQTT client not initialized");
    return;
  }

  logger.info(`Subscribing to topic: ${topic}`);
  client.subscribe(topic, (err) => {
    if (err) {
      logger.error(`Failed to subscribe to ${topic}: ${err.message}`);
      return;
    }
    logger.info(`Successfully subscribed to ${topic}`);
  });
}

export function isConnected() {
  return connected;
}

export function disconnect() {
  if (client) {
    client.end();
    logger.info("MQTT client disconnected");
  }
}
