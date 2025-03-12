import React, { useState, useEffect } from 'react'
import { Send, Power, PowerOff } from 'lucide-react'

function App() {
  const [message, setMessage] = useState('')
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [socket])

  const connectToSonicPi = () => {
    try {
      // Connect to local WebSocket server
      const ws = new WebSocket('ws://localhost:3000')
      
      ws.onopen = () => {
        setConnected(true)
        setSocket(ws)
      }

      ws.onclose = () => {
        setConnected(false)
        setSocket(null)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnected(false)
        setSocket(null)
      }

      ws.onmessage = (event) => {
        console.log('Received:', event.data)
      }
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const disconnectFromSonicPi = () => {
    if (socket) {
      socket.close()
      setSocket(null)
      setConnected(false)
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (socket && message.trim()) {
      socket.send(message.trim())
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Sonic Pi Controller
              </h1>
              <button
                onClick={connected ? disconnectFromSonicPi : connectToSonicPi}
                className={`rounded-full p-2 transition-colors ${
                  connected 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {connected ? <PowerOff size={24} /> : <Power size={24} />}
              </button>
            </div>

            <div className={`mb-6 p-4 rounded-lg ${
              connected ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
            }`}>
              <p className="text-sm font-medium">
                Status: {connected ? 'Connected to Sonic Pi' : 'Disconnected'}
              </p>
            </div>

            <form onSubmit={sendMessage} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Sonic Pi Command
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your Sonic Pi code here..."
                  className="w-full rounded-lg border-2 border-purple-200 px-4 py-2 focus:outline-none focus:border-purple-400 transition-colors"
                  disabled={!connected}
                />
              </div>
              <button
                type="submit"
                disabled={!connected || !message.trim()}
                className={`w-full rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors ${
                  connected && message.trim()
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={20} />
                <span>Send to Sonic Pi</span>
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 text-center">
              Make sure the WebSocket server is running on port 3000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App