#!/usr/bin/env node

import { spawn } from 'child_process';

// Run the server with ts-node and proper ESM support
const server = spawn('node', [
  '--loader', 'ts-node/esm',
  '--experimental-specifier-resolution=node',
  'src/server.ts'
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    TS_NODE_PROJECT: 'tsconfig.server.json'
  }
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Handle termination signals
process.on('SIGINT', () => {
  server.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.kill('SIGTERM');
  process.exit(0);
}); 