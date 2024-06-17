import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsOptional, MaxLength, IsDateString, IsMongoId, MinLength,
} from 'class-validator';

export class BookDto {
  @ApiProperty({
    example: 'The Great Gatsby',
    description: 'The title of the book',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
    title: string;

  @ApiProperty({
    example: 'A classic novel depicting the Jazz Age.',
    description: 'The description of the book',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  @MinLength(6)
    description?: string;

  @ApiProperty({
    example: '607c85c7134e312c208a8e25',
    description: 'The ID of the author of the book (must be a valid MongoDB ID)',
  })
  @IsMongoId()
    authorId: string;

  @ApiProperty({
    example: '2023-01-15T00:00:00.000Z',
    description: 'The published date of the book in ISO 8601 format',
  })
  @IsDateString()
    publishedDate: Date;
}
