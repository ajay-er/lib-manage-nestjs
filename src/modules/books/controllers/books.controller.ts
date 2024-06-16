import { Controller, Get } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import type { BookDoc } from '../repository/entities/books.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
  ) {}

  @Get()
  @ApiResponse()
  async findAll(): Promise<BookDoc[]> {
    return this.bookService.findAll();
  }
}
