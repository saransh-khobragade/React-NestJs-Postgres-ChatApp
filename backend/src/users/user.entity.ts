import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The full name of the user' })
  @Column({ length: 255 })
  name!: string;

  @ApiProperty({ description: 'The email address of the user' })
  @Column({ unique: true, length: 255 })
  email!: string;

  @ApiProperty({ description: 'The password of the user' })
  @Column({ length: 255 })
  password!: string;

  @ApiProperty({ description: 'The age of the user' })
  @Column({ type: 'int', nullable: true })
  age!: number;

  @ApiProperty({ description: 'Whether the user is active' })
  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @ApiProperty({ description: 'The date when the user was created' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({ description: 'The date when the user was last updated' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
