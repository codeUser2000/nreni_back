import { Server as SocketServer } from "socket.io";
import socketioJwt from "socketio-jwt";

const { JWT_SECRET } = process.env;

class Socket {
  static init = (server) => {
    this.io = new SocketServer(server, {
      cors: '*'
    });
    this.io.use(socketioJwt.authorize({
      secret: JWT_SECRET,
      handshake: true
    }));
    this.io.on('connect', this.#handleConnect);
  }

  static #handleConnect = (client) => {
    const { userId , isAdmin} = client.decoded_token;

    if(isAdmin){
      client.join('admin_room');
    }
    client.join(`user_${userId}`);
  }

  static emitUser = (userId, event, data = {}) => {
    this.io.to(`user_${userId}`).emit(event, data);
  }

  static sendingImg = (userId, event, data = {}) => {
    this.io.to(`user_${userId}`).emit(event, data);
  }
}

export default Socket;
