import { Controller, Get, Param, ParseIntPipe, UseGuards, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@ApiTags('conversations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/conversations')
export class ConversationsController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async list(@Req() req: any) {
    const data = await this.chatService.listConversationsForUser(req.user.sub);
    return { success: true, data };
  }

  @Get(':id/messages')
  async messages(@Param('id', ParseIntPipe) id: number) {
    const data = await this.chatService.listMessages(id);
    return { success: true, data };
  }

  @Post('direct/:userId')
  async direct(@Req() req: any, @Param('userId', ParseIntPipe) otherUserId: number) {
    const convo = await this.chatService.getOrCreateDirectConversation(req.user.sub, otherUserId);
    return { success: true, data: convo };
  }
}

