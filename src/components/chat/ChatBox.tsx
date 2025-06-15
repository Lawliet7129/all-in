import { useState } from 'react'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'User', // TODO: Replace with actual user info
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-surface rounded-lg shadow-lg">
      <div className="h-96 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <div className="text-sm text-gray-400">{message.sender}</div>
            <div className="bg-primary rounded-lg p-2">{message.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full bg-background rounded-lg px-4 py-2"
          placeholder="Type a message..."
        />
      </form>
    </div>
  )
} 