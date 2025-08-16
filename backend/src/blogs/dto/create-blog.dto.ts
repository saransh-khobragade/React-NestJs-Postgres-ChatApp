import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ description: 'Blog title', example: 'My first blog' })
  @IsString()
  @MinLength(3)
  title!: string;

  @ApiProperty({ description: 'Blog content (HTML)', example: '<p>Hello world</p>' })
  @IsString()
  @MinLength(1)
  content!: string;
}

