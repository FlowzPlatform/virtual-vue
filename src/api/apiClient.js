import feathers from 'feathers'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio'
import io from 'socket.io-client'
import { apiUrl } from '../constants'

const socket = io(apiUrl, {transports: ['websocket']})

// export default{
//   feathersClient: feathers().configure(hooks()).configure(socketio(socket))
// }
export const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
