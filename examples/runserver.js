"use strict";

const SERVER_PORT = 8081;
const SerialMonitor = require('../lib/serialMonitor');
const serialMonitor = new SerialMonitor.SerialMonitor( {portsToExclude:['/dev/tty.Bluetooth-Incoming-Port', '/dev/tty.JaybirdX3-SPPDev']} );

const WebSocketServer = require('ws').Server;
const webSocketServer = new WebSocketServer({perMessageDeflate: false, port: SERVER_PORT});

let wsClients = [];
webSocketServer.on('connection', function(ws) {
  console.log("New WebSocket client connection");
  wsClients.push(ws);
  ws.on('close', function() {
    console.log("WebSocket client connection closed");
    wsClients = wsClients.filter(item => item !== ws);
  });
});

serialMonitor.on('data', function(data) {
  console.log(`Serial data received: ${data}`);
  wsClients.forEach(function(ws) {
    ws.send(data);
  });
})
