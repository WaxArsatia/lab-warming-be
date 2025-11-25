import "dotenv/config";
import { createServer } from "node:http";
import express from "express";
import config from "#config/index.js";
import routes from "#routes/index.js";
import * as mqtt from "#services/mqtt.js";
import * as websocket from "#services/websocket.js";
import logger from "#utils/logger.js";

const app = express();
app.use(routes);

const httpServer = createServer(app);

websocket.initialize(httpServer);
mqtt.connect();

const PORT = config.server.port;
httpServer.listen(PORT, () => {
  logger.info("Server started successfully");
  logger.info(`HTTP Server: http://localhost:${PORT}`);
  logger.info(`Socket.IO: ws://localhost:${PORT}`);
  logger.info(`MQTT Broker: ${config.mqtt.host}:${config.mqtt.port}`);
  logger.info(`MQTT Topic: ${config.mqtt.topic}`);
});

const shutdown = () => {
  logger.info("Shutdown signal received, shutting down gracefully...");
  mqtt.disconnect();
  httpServer.close((err) => {
    if (err) {
      logger.error("Error during server shutdown", err);
      process.exit(1);
    }
    logger.info("Server closed");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.warn("Forcing shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
