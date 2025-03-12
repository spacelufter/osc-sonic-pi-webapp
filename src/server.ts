import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import pkg from 'osc';
const { UDPPort } = pkg;

const server = createServer();
const wss = new WebSocketServer({ server });

const oscPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: 4561,
  remoteAddress: "127.0.0.1",
  remotePort: 4560
});

oscPort.open();

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: Buffer | ArrayBuffer | Buffer[]) => {
    console.log('Received:', message.toString());
    oscPort.send({
      address: "/play",
      args: [message.toString()]
    });
    ws.send(`Received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});