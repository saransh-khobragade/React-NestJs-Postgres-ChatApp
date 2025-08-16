import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ConversationsController } from './conversations.controller';
import { User } from '../users/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message, User]), AuthModule],
  providers: [ChatService, ChatGateway],
  controllers: [ConversationsController],
  exports: [ChatService],
})
export class ChatModule {}

