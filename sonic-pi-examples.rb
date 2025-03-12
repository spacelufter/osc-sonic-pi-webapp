# Sonic Pi Examples Demonstration
# This script shows how each of the example commands works

# Clear any existing audio
use_debug false
use_bpm 120

# Example 1: Simple note
define :example_play do
  puts "Playing a simple note (Middle C)"
  play 60
end

# Example 2: Play a chord
define :example_play_chord do
  puts "Playing a C Major chord"
  play_chord [60, 64, 67]
end

# Example 3: Use a different synth
define :example_fm_synth do
  puts "Playing a note with FM synth"
  use_synth :fm
  play 72
end

# Example 4: Play a sample
define :example_sample do
  puts "Playing the Amen break sample"
  sample :loop_amen
end

# Example 5: Drum loop
define :example_drum_loop do
  puts "Playing a drum loop"
  use_bpm 120
  4.times do
    sample :bd_haus, rate: 1
    sleep 0.5
  end
end

# Example 6: TB303 pattern
define :example_tb303_pattern do
  puts "Playing a TB303 pattern"
  use_synth :tb303
  play_pattern_timed scale(:e3, :minor), 0.25, release: 0.1
end

# Main OSC listener
live_loop :websocket_input do
  # Listen for messages on the /play address from port 4561
  message = sync "/osc:127.0.0.1:4561/play"
  code = message[0].to_s
  
  puts "Received: #{code}"
  
  # Match the received message to our examples
  case code
  when "play"
    example_play
  when "play 60"
    example_play
  when "play_chord [60, 64, 67]"
    example_play_chord
  when "use_synth :fm; play 72"
    example_fm_synth
  when "sample :loop_amen"
    example_sample
  when /use_bpm 120; 16.times do/
    example_drum_loop
  when /use_synth :tb303; play_pattern_timed/
    example_tb303_pattern
  else
    # For any other code, try to evaluate it directly
    begin
      eval(code)
    rescue Exception => e
      puts "Error executing code: #{e.message}"
    end
  end
end

# Play a welcome sound to indicate the script is running
with_fx :reverb, room: 0.8 do
  sample :ambi_choir, rate: 0.5
end

puts "Sonic Pi Examples script started - waiting for messages on port 4561" 