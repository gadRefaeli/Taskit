import { httpService } from './http-service'
import io from 'socket.io-client'

export const socketService = createSocketService()

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

window.socketService = socketService

var socketIsReady = false;

let socket = io(baseUrl, { reconnection: false })

function createSocketService() {
  const socketService = {
    async setup() {
      if (socket) return
      await httpService.get('setup-session')
      socketIsReady = true;
    },

    async on(eventName, cb) {
      if (!socket) await socketService.setup()
      socket.on(eventName, cb)
    },
    async off(eventName, cb = null) {
      if (!socket) await socketService.setup()
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async emit(eventName, data) {
      if (!socket) await socketService.setup()
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
      socketIsReady = false
    }
  }
  return socketService
}
