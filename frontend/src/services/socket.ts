import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Socket.ioサーバーのURL

class SocketService {
  private socket = io(SOCKET_URL);

  constructor() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  public on(event: string, listener: (data: any) => void) {
    this.socket.on(event, listener);
  }
}

export const socketService = new SocketService();
