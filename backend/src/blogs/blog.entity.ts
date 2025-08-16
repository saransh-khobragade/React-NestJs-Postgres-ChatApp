import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('blogs')
export class Blog {
  @ApiProperty({ description: 'The unique identifier of the blog post' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'Blog title' })
  @Column({ length: 255 })
  title!: string;

  @ApiProperty({ description: 'Blog content (HTML)' })
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty({ description: 'Author ID' })
  @Column({ name: 'author_id' })
  authorId!: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}

