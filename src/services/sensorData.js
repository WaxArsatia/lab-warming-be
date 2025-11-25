import config from "#config/index.js";
import * as mqtt from "#services/mqtt.js";
import * as websocket from "#services/websocket.js";
import logger from "#utils/logger.js";

export function onMqttMessage(topic, message) {
  try {
    const payload = JSON.parse(message.toString());
    logger.info(`MQTT message received on ${topic}`, { payload });

    websocket.emit(config.socketIo.events.data, {
      topic,
      data: payload,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    logger.error(`Failed to parse MQTT message: ${err.message}`, {
      rawMessage: message.toString(),
    });

    websocket.emit(config.socketIo.events.error, {
      error: "Invalid JSON payload",
      rawMessage: message.toString(),
      timestamp: new Date().toISOString(),
    });
  }
}

export function onClientConnected(socket) {
  socket.emit(config.socketIo.events.status, { connected: mqtt.isConnected() });
}

export function getStatus() {
  return {
    mqtt: {
      connected: mqtt.isConnected(),
      topic: config.mqtt.topic,
    },
    websocket: {
      connectedClients: websocket.getConnectedClients(),
    },
  };
}
