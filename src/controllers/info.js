import config from "#config/index.js";

export function getInfo(_req, res) {
  res.json({
    message: "MQTT to Socket.IO Bridge Server",
    endpoints: {
      health: "/health",
    },
    mqtt: {
      topic: config.mqtt.topic,
    },
    socketIo: {
      events: {
        data: config.socketIo.events.data,
        error: config.socketIo.events.error,
        status: config.socketIo.events.status,
      },
    },
  });
}
