import { api } from './api';

export interface ConversationDto {
  id: number;
  participants: { id: number; name: string; email: string }[];
  createdAt: string;
}

export interface MessageDto {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

export const chatService = {
  listConversations: async (userId: number): Promise<ConversationDto[]> => {
    const resp = await api.get<{ success: boolean; data: ConversationDto[] }>(`/api/conversations?userId=${String(userId)}`);
    return resp.data;
  },
  listMessages: async (conversationId: number): Promise<MessageDto[]> => {
    const resp = await api.get<{ success: boolean; data: MessageDto[] }>(`/api/conversations/${String(conversationId)}/messages`);
    return resp.data;
  },
};

