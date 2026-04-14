# Lab Warming Backend

Backend service that subscribes to MQTT messages and broadcasts parsed data to Socket.IO clients.

## Overview

This service:

- Runs an Express HTTP server.
- Exposes basic health/info endpoints.
- Connects to an MQTT broker and subscribes to one topic.
- Emits incoming MQTT payloads to all connected Socket.IO clients.

## Features

- HTTP endpoints:
  - `GET /`
  - `GET /health`
- MQTT subscriber with automatic reconnect.
- Socket.IO broadcast for data, error, and broker status events.
- Graceful shutdown handling for `SIGINT` and `SIGTERM`.

## Tech Stack

- Node.js (ES Modules)
- Express
- MQTT.js
- Socket.IO
- Winston
- Biome (lint/format)

## Setup and Run

### 1) Install dependencies

```bash
npm install
```

### 2) Create environment file

Copy `.env.example` to `.env`, then set your values:

```bash
cp .env.example .env
```

Required environment variables used by the app:

- `NODE_ENV`
- `PORT`
- `MQTT_ADDRESS`
- `MQTT_PORT`
- `MQTT_USERNAME`
- `MQTT_PASSWORD`
- `MQTT_TOPIC`
- `SOCKETIO_EVENT_DATA`
- `SOCKETIO_EVENT_ERROR`
- `SOCKETIO_EVENT_STATUS`

Note: MQTT protocol is configured as `mqtts` in code.

### 3) Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API

### GET /

Returns service metadata, exposed endpoints, MQTT topic, and configured Socket.IO event names.

### GET /health

Returns:

- `status`
- MQTT connection status and topic
- connected Socket.IO client count
- current timestamp

## Socket.IO Events

Server emits these events:

- Data event name from `SOCKETIO_EVENT_DATA` (default: `sensorData`)
  - Payload: parsed MQTT JSON payload as-is
- Error event name from `SOCKETIO_EVENT_ERROR` (default: `sensorError`)
  - Payload:
    - `error`
    - `rawMessage`
    - `timestamp`
- Status event name from `SOCKETIO_EVENT_STATUS` (default: `mqttStatus`)
  - Payload:
    - `connected`

## Project Structure

```text
src/
  config/
  controllers/
  routes/
  services/
  utils/
  index.js
```

## License

ISC
