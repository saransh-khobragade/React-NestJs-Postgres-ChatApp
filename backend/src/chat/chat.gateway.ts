import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly chatService: ChatService, private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = (client.handshake.auth?.token as string) || (client.handshake.headers['authorization'] as string)?.replace('Bearer ', '') || '';
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET || 'dev_jwt_secret' });
      (client as any).userId = payload.sub;
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('message.send')
  async onMessageSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number; content: string },
  ) {
    const userId = (client as any).userId as number;
    if (!userId) return;
    const message = await this.chatService.sendMessage(data.conversationId, userId, data.content);
    this.server.to(`conversation:${String(data.conversationId)}`).emit('message.receive', message);
    return message;
  }

  @SubscribeMessage('conversation.join')
  async onJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: number }) {
    const room = `conversation:${String(data.conversationId)}`;
    await client.join(room);
    return { joined: room };
  }

  @SubscribeMessage('conversation.leave')
  async onLeave(@ConnectedSocket() client: Socket, @MessageBody() data: { conversationId: number }) {
    const room = `conversation:${String(data.conversationId)}`;
    await client.leave(room);
    return { left: room };
  }
}

