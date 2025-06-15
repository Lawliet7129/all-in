import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

interface User {
  id: string
  name: string
  avatar: string
  position: [number, number, number]
}

const users = new Map<string, User>()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join', (user: User) => {
    users.set(socket.id, user)
    socket.broadcast.emit('userJoined', user)
    socket.emit('users', Array.from(users.values()))
  })

  socket.on('move', (position: [number, number, number]) => {
    const user = users.get(socket.id)
    if (user) {
      user.position = position
      socket.broadcast.emit('userMoved', {
        userId: socket.id,
        position,
      })
    }
  })

  socket.on('offer', (data: { peerId: string; offer: any }) => {
    io.to(data.peerId).emit('offer', {
      peerId: socket.id,
      offer: data.offer,
    })
  })

  socket.on('answer', (data: { peerId: string; answer: any }) => {
    io.to(data.peerId).emit('answer', {
      peerId: socket.id,
      answer: data.answer,
    })
  })

  socket.on('ice-candidate', (data: { peerId: string; candidate: any }) => {
    io.to(data.peerId).emit('ice-candidate', {
      peerId: socket.id,
      candidate: data.candidate,
    })
  })

  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      users.delete(socket.id)
      socket.broadcast.emit('userLeft', socket.id)
    }
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 