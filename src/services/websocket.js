import { Server } from "socket.io";
import config from "#config/index.js";
import * as sensorData from "#services/sensorData.js";
import logger from "#utils/logger.js";

let io = null;
let connectedClients = 0;

export function initialize(httpServer) {
  io = new Server(httpServer, {
    cors: config.socketIo.cors,
  });

  io.on("connection", (socket) => {
    connectedClients++;
    logger.info("Socket.IO client connected", {
      socketId: socket.id,
      totalClients: connectedClients,
    });

    socket.on("disconnect", () => {
      connectedClients--;
      logger.info("Socket.IO client disconnected", {
        socketId: socket.id,
        totalClients: connectedClients,
      });
    });

    sensorData.onClientConnected(socket);
  });

  logger.info("Socket.IO server initialized");
}

export function emit(event, data) {
  if (!io) return;
  io.emit(event, data);
}

export function getConnectedClients() {
  return connectedClients;
}
