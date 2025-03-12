# Sonic Pi Loop Controller
# This script is designed to work with the WebSocket Loop Creator interface

# Set up global variables
use_debug false
use_bpm 120

# Clear any existing audio when starting
with_fx :level, amp: 0.8 do
  # Main OSC listener for incoming messages
  live_loop :websocket_input do
    # Listen for messages on the /play address from port 4561
    message = sync "/osc:127.0.0.1:4561/play"
    code = message[0].to_s
    
    # Print the received message to the Sonic Pi log
    puts "Received OSC message: #{code}"
    
    # Safely evaluate the received code
    begin
      # Use eval to execute the received code as Sonic Pi code
      eval(code)
      puts "Successfully executed!"
    rescue Exception => e
      puts "Error executing code: #{e.message}"
    end
  end
end

# Print a message to show the script has started
puts "Sonic Pi Loop Controller started - waiting for messages on port 4561"
puts "Ready to create and manage loops from the WebSocket interface" 