import {
  BadRequestException,
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import type { BookDoc } from '../repository/entities/books.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';
import { BookDto } from '@/modules/books/dto/book.dto';
import { UpdateBookDto } from '../dto/updateBook.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
  ) {}

  @ApiResponse()
  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<BookDoc> {
    return this.bookService.create(bookDto);
  }

  @ApiResponse()
  @Get()
  async getAllBooks(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<BookDoc[]> {
    const pageNumber = page ? parseInt(page.toString(), 10) : 1;
    const limitNumber = limit ? parseInt(limit.toString(), 10) : 10;

    return this.bookService.findAll(pageNumber, limitNumber);
  }

  @ApiResponse()
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookDoc> {
    const book = await this.bookService.findById(id);
    if (!book) throw new BadRequestException('Book not found!');
    return book;
  }

  @ApiResponse('Updated Successfully')
  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
      @Body() bookDto: UpdateBookDto,
  ): Promise<BookDoc> {
    return this.bookService.update(id, bookDto);
  }

  @ApiResponse('Deleted Successfully!')
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<BookDoc> {
    const book = await this.bookService.findById(id);
    if (!book) throw new BadRequestException('Book not found!');
    return this.bookService.delete(id);
  }
}
