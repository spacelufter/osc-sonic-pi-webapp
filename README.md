# Sonic Pi Controller

A web interface to control Sonic Pi using WebSocket communication.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Sonic Pi installed and running on your computer

## Installation

1. Clone or download this repository to your local machine
2. Open a terminal in the project directory
3. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the WebSocket server:
```bash
npm run server
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Development

- Frontend code is in `src/App.tsx`
- WebSocket server code is in `src/server.js`
- The WebSocket server runs on port 3000
- The frontend development server runs on port 5173

## Project Structure

```
├── src/
│   ├── App.tsx          # Frontend React application
│   ├── server.js        # WebSocket server
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Project dependencies and scripts
└── README.md           # This file
```