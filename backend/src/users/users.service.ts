import { Injectable, NotFoundException } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.create', async (span) => {
      try {
        const user = this.usersRepository.create(createUserDto);
        const saved = await this.usersRepository.save(user);
        span.setAttribute('user.id', saved.id);
        return saved;
      } finally {
        span.end();
      }
    });
  }

  async findAll(): Promise<User[]> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.findAll', async (span) => {
      try {
        return await this.usersRepository.find();
      } finally {
        span.end();
      }
    });
  }

  async search(query: string): Promise<User[]> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.search', async (span) => {
      try {
        return await this.usersRepository.find({
          where: [
            { name: ILike(`%${query}%`) },
            { email: ILike(`%${query}%`) },
          ],
          take: 20,
        });
      } finally {
        span.end();
      }
    });
  }

  async findOne(id: number): Promise<User> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.findOne', async (span) => {
      span.setAttribute('user.id', id);
      try {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
          span.setAttribute('error', true);
          span.addEvent('user.not_found');
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      } finally {
        span.end();
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.update', async (span) => {
      span.setAttribute('user.id', id);
      try {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
      } finally {
        span.end();
      }
    });
  }

  async remove(id: number): Promise<void> {
    const tracer = trace.getTracer('users-service');
    await tracer.startActiveSpan('UsersService.remove', async (span) => {
      span.setAttribute('user.id', id);
      try {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
      } finally {
        span.end();
      }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const tracer = trace.getTracer('users-service');
    return await tracer.startActiveSpan('UsersService.findByEmail', async (span) => {
      span.setAttribute('user.email', email);
      try {
        return await this.usersRepository.findOne({ where: { email } });
      } finally {
        span.end();
      }
    });
  }
}
