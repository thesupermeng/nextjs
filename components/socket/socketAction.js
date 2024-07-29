import { io } from 'socket.io-client';
export default class SocketAction {
  static instanceCreated = false;

  constructor(socketUrls) {
    this.sockets = {};
    this.socketUrls = socketUrls;
  }

  static instance = new SocketAction();
  static createInstance(socketUrls) {
    if (!this.instanceCreated) {
      this.instance = new SocketAction(socketUrls);
      this.instance.connectAll();
      this.instanceCreated = true;
    }
  }

  connect(key, url, token) {
    if (this.sockets[key]?.connected) {
      this.disconnect(key);
    }
    const socket = io(url, {
      transports: ['websocket'], // use only websocket, important
      auth: {
        token,
      },
    });
    socket.connect();
    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.connect(key, url, token);
      }
      // else the socket will automatically try to reconnect
    });
    return socket;
  }

  disconnect(key) {
    this.sockets[key].removeAllListeners();
    this.sockets[key].disconnect();
  }

  connectAll() {
    Object.keys(this.socketUrls)?.forEach((key) => {
      const socket = this.connect(
        key,
        this.socketUrls[key].url,
        this.socketUrls[key].token
      );
      this.sockets[key] = socket;
    });
  }

  disconnectAll() {
    Object.keys(this.socketUrls)?.forEach((key) => {
      this.sockets[key].disconnect();
      delete this.sockets[key];
    });
  }

  getSocket(name) {
    return this.sockets[name];
  }
}
