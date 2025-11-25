import "dotenv/config";

const config = {
  // Server configuration
  server: {
    port: Number.parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_ENV || "development",
  },

  // MQTT configuration
  mqtt: {
    host: process.env.MQTT_ADDRESS,
    port: Number.parseInt(process.env.MQTT_PORT, 10),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    protocol: "mqtts",
    reconnectPeriod: 5000,
    connectTimeout: 30000,
    topic: process.env.MQTT_TOPIC || "sensor/dht11",
  },

  // Socket.IO configuration
  socketIo: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    events: {
      data: process.env.SOCKETIO_EVENT_DATA || "sensorData",
      error: process.env.SOCKETIO_EVENT_ERROR || "sensorError",
      status: process.env.SOCKETIO_EVENT_STATUS || "mqttStatus",
    },
  },
};
export default config;
