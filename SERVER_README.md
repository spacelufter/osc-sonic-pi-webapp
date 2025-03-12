# WebSocket to OSC Server for Sonic Pi

This server acts as a bridge between WebSocket clients and Sonic Pi using OSC (Open Sound Control).

## Setup

1. Make sure you have Node.js installed (v14 or higher recommended)
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure Sonic Pi is running and ready to receive OSC messages

## Running the Server

To start the server, run:

```
npm run server
```

This will:
1. Compile the TypeScript code to JavaScript
2. Start the server on port 3000 for WebSocket connections
3. Set up an OSC UDP port that sends messages to Sonic Pi on port 4560

## Using with Sonic Pi

1. Start Sonic Pi before running this server
2. In Sonic Pi, you can receive OSC messages with code like:
   ```ruby
   live_loop :websocket_input do
     message = sync "/osc:127.0.0.1:4560/play"
     puts "Received: #{message}"
     # Do something with the message, for example:
     eval(message[0]) if message[0].is_a?(String)
     # Or play a note:
     # play message[0].to_i
   end
   ```
3. Connect to the WebSocket server from your client application
4. Send messages that Sonic Pi can understand

## Testing

You can test the WebSocket connection using a simple browser-based client:

```html
<!DOCTYPE html>
<html>
<head>
  <title>WebSocket Test</title>
</head>
<body>
  <input id="message" type="text" placeholder="Enter message">
  <button onclick="sendMessage()">Send</button>
  <div id="output"></div>

  <script>
    const ws = new WebSocket('ws://localhost:3000');
    
    ws.onopen = () => {
      document.getElementById('output').innerHTML += '<p>Connected to server</p>';
    };
    
    ws.onmessage = (event) => {
      document.getElementById('output').innerHTML += `<p>${event.data}</p>`;
    };
    
    function sendMessage() {
      const message = document.getElementById('message').value;
      ws.send(message);
    }
  </script>
</body>
</html>
```

## Sonic Pi OSC Examples

Here are some examples of messages you can send to Sonic Pi:

1. Play a note: `play 60`
2. Play a chord: `play_chord [60, 64, 67]`
3. Use a synth: `use_synth :fm; play 60`
4. Play a sample: `sample :loop_amen`

## Troubleshooting

If you see an `EADDRINUSE` error, it means the port is already in use. You can:

1. Stop any other applications using the port
2. Edit `src/server.ts` to use a different port for the local OSC port
3. Rebuild and restart the server

## Development

To modify the server:

1. Edit files in the `src` directory
2. Run `npm run build-server` to compile
3. Run `node dist/server.js` to start the server 