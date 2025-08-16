import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Conversation } from './conversation.entity';
import { Message } from './message.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOrCreateDirectConversation(userIdA: number, userIdB: number): Promise<Conversation> {
    const userIds = [userIdA, userIdB].sort((a, b) => a - b);
    const existing = await this.conversationRepository
      .createQueryBuilder('c')
      .leftJoin('c.participants', 'p')
      .where('p.id IN (:...ids)', { ids: userIds })
      .groupBy('c.id')
      .having('COUNT(DISTINCT p.id) = 2')
      .getOne();

    if (existing) return existing;

    const users = await this.userRepository.find({ where: { id: In(userIds) } });
    if (users.length !== 2) throw new NotFoundException('Users not found');

    const conversation = this.conversationRepository.create({ participants: users });
    return await this.conversationRepository.save(conversation);
  }

  async listConversationsForUser(userId: number): Promise<Conversation[]> {
    return await this.conversationRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.participants', 'p')
      .where('p.id = :userId', { userId })
      .orderBy('c.id', 'DESC')
      .getMany();
  }

  async listMessages(conversationId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
    });
  }

  async sendMessage(conversationId: number, senderId: number, content: string): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({ where: { id: conversationId } });
    if (!conversation) throw new NotFoundException('Conversation not found');
    const message = this.messageRepository.create({ conversationId, senderId, content });
    return await this.messageRepository.save(message);
  }
}

