# Lab Warming Backend

MQTT to Socket.IO Bridge Server for DHT11 sensor data streaming.

## API Endpoints

### GET `/`
Returns server information and available endpoints.

**Response:**
```json
{
  "message": "MQTT to Socket.IO Bridge Server",
  "endpoints": { "health": "/health" },
  "mqtt": { "topic": "sensor/dht11" },
  "socketIo": {
    "events": {
      "data": "sensorData",
      "error": "sensorError",
      "status": "mqttStatus"
    }
  }
}
```

### GET `/health`
Returns server health status.

**Response:**
```json
{
  "status": "ok",
  "mqtt": {
    "connected": true,
    "topic": "sensor/dht11"
  },
  "socketIo": {
    "connectedClients": 2
  },
  "timestamp": "2025-11-25T10:30:00.000Z"
}
```

## WebSocket Events

### Client → Server
No events needed (receive-only).

### Server → Client

#### `sensorData` (or custom via `SOCKETIO_EVENT_DATA`)
Sensor data from MQTT.

```json
{
  "topic": "sensor/dht11",
  "data": {
    "temperature": 25.5,
    "humidity": 60.2
  },
  "timestamp": "2025-11-25T10:30:00.000Z"
}
```

#### `sensorError` (or custom via `SOCKETIO_EVENT_ERROR`)
Error when parsing MQTT message.

```json
{
  "error": "Invalid JSON payload",
  "rawMessage": "malformed data",
  "timestamp": "2025-11-25T10:30:00.000Z"
}
```

#### `mqttStatus` (or custom via `SOCKETIO_EVENT_STATUS`)
MQTT connection status (sent on client connect).

```json
{
  "connected": true
}
```
