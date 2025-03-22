import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private users: { [socketId: string]: string } = {};

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.users[client.id] = username;

    client.join('general');

    this.server.to('general').emit('userJoined', username);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const username = this.users[client.id];

    this.server.to('general').emit('message', { username, message });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@ConnectedSocket() client: Socket): void {
    const username = this.users[client.id];

    delete this.users[client.id];

    this.server.to('general').emit('userLeft', username);

    client.leave('general');
  }
}