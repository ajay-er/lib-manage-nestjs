import {
  BadRequestException,
  Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import type { BookDoc } from '../repository/entities/books.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';
import { BookDto } from '@/modules/books/dto/book.dto';
import { UpdateBookDto } from '../dto/updateBook.dto';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import { DateDto } from '../dto/date.dto';
import { DocResponse } from '@/modules/docs/dto/doc.decorator';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: [BookDto],
  })
  @ApiResponse()
  @Get('/date-range')
  async getBooksWithinDateRange(
    @Query() dateDto: DateDto,
  ): Promise<BookDoc[]> {
    return this.bookService.findAllWithinDateRange(dateDto);
  }

  @DocResponse('Success', {
    httpStatus: HttpStatus.CREATED,
    dto: BookDto,
  })
  @ApiResponse()
  @Post()
  async createBook(@Body() bookDto: BookDto): Promise<BookDoc> {
    const author = await this.authorsService.findById(bookDto.authorId);
    if (!author) throw new BadRequestException('Author not found');
    return this.bookService.create(bookDto);
  }

  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: [BookDto],
  })
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

  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: BookDto,
  })
  @ApiResponse()
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookDoc> {
    const book = await this.bookService.findById(id);
    if (!book) throw new BadRequestException('Book not found!');
    return book;
  }

  @DocResponse('Updated Successfully', {
    httpStatus: HttpStatus.OK,
    dto: BookDto,
  })
  @ApiResponse('Updated Successfully')
  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
      @Body() bookDto: UpdateBookDto,
  ): Promise<BookDoc> {
    return this.bookService.update(id, bookDto);
  }

  @DocResponse('Deleted Successfully', {
    httpStatus: HttpStatus.OK,
    dto: BookDto,
  })
  @ApiResponse('Deleted Successfully!')
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<BookDoc> {
    const book = await this.bookService.findById(id);
    if (!book) throw new BadRequestException('Book not found!');
    return this.bookService.delete(id);
  }

  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: [BookDto],
  })
  @ApiResponse()
  @Get('author/:authorId')
  async getAuthorBooks(
    @Param('authorId') authorId: string,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
  ): Promise<BookDoc[]> {
    const pageNumber = page ? parseInt(page.toString(), 10) : 1;
    const limitNumber = limit ? parseInt(limit.toString(), 10) : 10;

    return this.bookService.findAllAuthorBooks(authorId, pageNumber, limitNumber);
  }

  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
  })
  @ApiResponse('Author Books deleted successfully!')
  @Delete('author/:authorId')
  async deleteAuthorBooks(
    @Param('authorId') authorId: string,
  ): Promise<unknown> {
    return this.bookService.deleteAllAuthorBooks(authorId);
  }
}
