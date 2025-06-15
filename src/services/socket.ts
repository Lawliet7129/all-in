import { io, Socket } from 'socket.io-client'
import { useStore } from '../store/useStore'

let socket: Socket | null = null

export const initializeSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
      autoConnect: false,
    })

    socket.on('connect', () => {
      console.log('Connected to socket server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server')
    })

    socket.on('userJoined', (user) => {
      useStore.getState().addUser(user)
    })

    socket.on('userLeft', (userId) => {
      useStore.getState().removeUser(userId)
    })

    socket.on('userMoved', ({ userId, position }) => {
      useStore.getState().updateUserPosition(userId, position)
    })
  }

  return socket
}

export const getSocket = () => {
  if (!socket) {
    return initializeSocket()
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
} 