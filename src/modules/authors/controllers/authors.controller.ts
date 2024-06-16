import {
  BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';
import { AuthorDto } from '@/modules/authors/dto/auth.dto';
import { UpdateAuthorDto } from '@/modules/authors/dto/update-auth.dto';
import { BooksService } from '@/modules/books/services/books.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @ApiResponse()
  @Post()
  async createAuthor(@Body() authorDto: AuthorDto): Promise<AuthorDoc> {
    return this.authorsService.create(authorDto);
  }

  @ApiResponse()
  @Get()
  async getAllAuthors(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<AuthorDoc[]> {
    const pageNumber = page ? parseInt(page.toString(), 10) : 1;
    const limitNumber = limit ? parseInt(limit.toString(), 10) : 10;

    return this.authorsService.findAll(pageNumber, limitNumber);
  }

  @ApiResponse()
  @Get(':id')
  async getAuthorById(@Param('id') id: string): Promise<AuthorDoc> {
    const author = await this.authorsService.findById(id);
    if (!author) throw new BadRequestException('Author not found!');
    return author;
  }

  @ApiResponse('Updated Successfully')
  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
      @Body() authorDto: UpdateAuthorDto,
  ): Promise<AuthorDoc> {
    return this.authorsService.update(id, authorDto);
  }

  @ApiResponse('Author Deleted Successfully!')
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<AuthorDoc> {
    const author = await this.authorsService.findById(id);
    if (!author) throw new BadRequestException('Author not found!');
    await this.booksService.deleteAllAuthorBooks(id);
    return this.authorsService.delete(id);
  }
}
