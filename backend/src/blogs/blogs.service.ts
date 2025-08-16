import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(authorId: number, dto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogsRepository.create({
      title: dto.title,
      content: dto.content,
      authorId,
    });
    return await this.blogsRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }
}

