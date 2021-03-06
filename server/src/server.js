const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express()
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
