import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { UDPPort } from 'osc';

const server = createServer();
const wss = new WebSocketServer({ server });

const oscPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: 4560,
});

oscPort.open();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    
    oscPort.send({
      address: "/your/osc/address",
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