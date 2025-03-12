# WebSocket to OSC Bridge for Sonic Pi
# This script listens for OSC messages from the WebSocket server
# and executes them as Sonic Pi code

# Set up a live loop to listen for incoming OSC messages
live_loop :websocket_input do
  # Listen for messages on the /play address from port 4561
  message = sync "/osc:127.0.0.1:4561/play"
  
  # Print the received message to the Sonic Pi log
  puts "Received OSC message: #{message}"
  
  # Extract the code from the message
  code = message[0].to_s
  
  # Handle special cases for malformed code
  if code.include?("16.times do") && code.include?("sleep 0.5end")
    # Fix the missing newlines in the drum loop code
    code = code.gsub("16.times do", "16.times do\n")
               .gsub("sleep 0.5end", "sleep 0.5\nend")
  end
  
  # Print the code we're about to execute
  puts "Executing: #{code}"
  
  # Safely evaluate the received code
  begin
    # Use eval to execute the received code as Sonic Pi code
    eval(code)
    puts "Successfully executed!"
    
    # Cue the visual feedback loop
    cue :new_message
  rescue Exception => e
    puts "Error executing code: #{e.message}"
  end
end

# Set up a second live loop to provide visual feedback
live_loop :visual_feedback do
  # This loop will flash the background color when a message is received
  # It uses a cue/sync mechanism to communicate with the websocket_input loop
  sync :new_message
  
  # Flash the background to indicate a message was received
  with_fx :wobble, phase: 0.5, mix: 0.3 do
    sample :ambi_choir, rate: 0.5, amp: 0.3
  end
  
  sleep 1
end

# Optional: Add a simple background ambient sound to indicate the script is running
live_loop :background_ambient do
  # Play a very quiet ambient sound to indicate the script is running
  sample :ambi_lunar_land, rate: 0.5, amp: 0.1
  sleep 8
end

# Print a message to show the script has started
puts "WebSocket OSC listener started - waiting for messages on port 4561" 