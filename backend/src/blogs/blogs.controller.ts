import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@ApiTags('blogs')
@Controller('api/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'List all blogs' })
  async list(): Promise<{ success: true; data: Array<{ id: number; title: string; content: string; createdAt: Date; author: { id: number; name: string } }> }> {
    const blogs = await this.blogsService.findAll();
    return {
      success: true,
      data: blogs.map((b) => ({
        id: b.id,
        title: b.title,
        content: b.content,
        createdAt: b.createdAt,
        author: { id: b.author?.id, name: b.author?.name },
      })),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog by id' })
  async detail(@Param('id', ParseIntPipe) id: number): Promise<{ success: true; data: { id: number; title: string; content: string; createdAt: Date; author: { id: number; name: string } } }> {
    const b = await this.blogsService.findOne(id);
    return {
      success: true,
      data: {
        id: b.id,
        title: b.title,
        content: b.content,
        createdAt: b.createdAt,
        author: { id: b.author?.id, name: b.author?.name },
      },
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a blog (protected)' })
  async create(@Body() dto: CreateBlogDto, @Req() req: { user: { sub: number } }): Promise<{ success: true; data: { id: number; title: string; content: string; createdAt: Date; author: { id: number; name: string } } }> {
    const b = await this.blogsService.create(req.user.sub, dto);
    return {
      success: true,
      data: {
        id: b.id,
        title: b.title,
        content: b.content,
        createdAt: b.createdAt,
        author: { id: b.author?.id, name: b.author?.name },
      },
    };
  }
}

