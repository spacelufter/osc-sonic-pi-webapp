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

### 4. sonic-pi-loops.rb

A specialized script for working with the Loop Creator interface:
- Optimized for creating and managing multiple loops
- Handles loop creation and stopping
- Provides a clean environment for loop experimentation

## How to Use

1. Start Sonic Pi
2. Copy one of the scripts into a Sonic Pi buffer
3. Run the script (press the Run button)
4. Open the HTML test page in your browser
5. Send commands using the buttons or text input

## Using the Loop Creator

The Loop Creator interface allows you to create and manage multiple Sonic Pi loops with customizable parameters:

1. Click on the "Loop Creator" tab in the HTML interface
2. Click "Add Loop" to create a new loop
3. Configure the loop parameters:
   - **Loop Name**: A unique name for your loop
   - **Synth**: Choose from Sonic Pi's built-in synthesizers
   - **Note**: Select the note to play
   - **Sleep Time**: Time between notes (in seconds)
   - **Attack**: How quickly the note reaches full volume (0-5 seconds)
   - **Sustain**: How long the note holds at full volume (0-5 seconds)
   - **Release**: How long the note takes to fade out (0-5 seconds)
4. Click "Start Loop" to begin playing the loop
5. Click "Stop Loop" to stop the loop
6. Click "Remove" to delete the loop

You can create multiple loops with different parameters, and they will all play simultaneously in Sonic Pi.

## Using the Notes Tab

The Notes tab provides a way to create and play individual notes with precise control:

1. Click on the "Notes" tab in the HTML interface
2. Click "Add Note" to create a new note
3. Configure the note parameters:
   - **Synth**: Choose from Sonic Pi's built-in synthesizers
   - **Note**: Select the note (C, C#, D, etc.)
   - **Octave**: Choose the octave (1-7) using the number buttons
   - **Attack**: How quickly the note reaches full volume (0-5 seconds)
   - **Sustain**: How long the note holds at full volume (0-5 seconds)
   - **Release**: How long the note takes to fade out (0-5 seconds)
   - **Amplitude**: The volume of the note (0-5)
4. Click "Play Note" to play the note once
5. Click "Remove" to delete the note

You can create multiple notes with different parameters and play them individually. This is great for testing different sounds and creating melodies.

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
- If loops don't stop properly, you may need to restart Sonic Pi

## Advanced Usage

You can modify these scripts to:
- Add more predefined patterns
- Change the OSC address or port
- Add more sophisticated error handling
- Create interactive performances by combining with other Sonic Pi code
- Extend the Loop Creator with additional parameters and features 