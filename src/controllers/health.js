import * as sensorData from "#services/sensorData.js";

export function getHealth(_req, res) {
  const status = sensorData.getStatus();

  res.json({
    status: "ok",
    mqtt: status.mqtt,
    socketIo: status.websocket,
    timestamp: new Date().toISOString(),
  });
}
