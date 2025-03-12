# Sonic Pi WebSocket Controller Scripts

This repository contains several Sonic Pi scripts that can receive OSC messages from the WebSocket server and execute them as Sonic Pi code.

## Setup

1. Make sure you have Sonic Pi installed and running
2. Start the WebSocket to OSC server using `npm run server`
3. Copy one of the Sonic Pi scripts into Sonic Pi
4. Run the script in Sonic Pi
5. Open the HTML test page in your browser to send commands

## Available Scripts

### 1. sonic-pi-script.rb

This is the full-featured script that:
- Listens for OSC messages on port 4561
- Executes the received code
- Provides visual and audio feedback when messages are received
- Includes error handling

### 2. sonic-pi-simple.rb

A simplified version that:
- Just listens for messages and executes them
- Minimal code with basic error handling
- Good for understanding the core functionality

### 3. sonic-pi-examples.rb

A demonstration script that:
- Has predefined functions for each example command
- Matches received messages to the appropriate function
- Shows how each command works in isolation
- Falls back to direct evaluation for other commands

## How to Use

1. Start Sonic Pi
2. Copy one of the scripts into a Sonic Pi buffer
3. Run the script (press the Run button)
4. Open the HTML test page in your browser
5. Send commands using the buttons or text input

## Example Commands

These commands are supported by all scripts:

1. `play` - Play a simple note
2. `play 60` - Play middle C
3. `play_chord [60, 64, 67]` - Play a C major chord
4. `use_synth :fm; play 72` - Use the FM synth to play a high C
5. `sample :loop_amen` - Play the Amen break sample
6. `use_bpm 120; 16.times do sample :bd_haus, rate: 1 sleep 0.5 end` - Play a drum loop
7. `use_synth :tb303; play_pattern_timed scale(:e3, :minor), 0.25, release: 0.1` - Play a TB303 pattern

## Troubleshooting

- If you don't hear any sound, make sure Sonic Pi is running and the script is active
- Check the Sonic Pi log panel for error messages
- Verify that the WebSocket server is running (`npm run server`)
- Make sure the ports match (the server should send to port 4561)

## Advanced Usage

You can modify these scripts to:
- Add more predefined patterns
- Change the OSC address or port
- Add more sophisticated error handling
- Create interactive performances by combining with other Sonic Pi code 