# Simple WebSocket to OSC Bridge for Sonic Pi
# This script listens for OSC messages and executes them directly

live_loop :websocket_input do
  # Listen for messages on the /play address from port 4561
  message = sync "/osc:127.0.0.1:4561/play"
  
  # Extract the code from the message
  code = message[0].to_s
  
  # Fix any formatting issues in the code
  if code.include?("16.times do") && code.include?("sleep 0.5end")
    code = code.gsub("16.times do", "16.times do\n")
               .gsub("sleep 0.5end", "sleep 0.5\nend")
  end
  
  # Log what we're about to do
  puts "Executing: #{code}"
  
  # Execute the code
  begin
    eval(code)
  rescue Exception => e
    puts "Error: #{e.message}"
  end
end

puts "Simple WebSocket OSC listener started - waiting for messages on port 4561" 