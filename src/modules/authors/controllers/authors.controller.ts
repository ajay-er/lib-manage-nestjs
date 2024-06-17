import {
  BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';
import { AuthorDto } from '@/modules/authors/dto/auth.dto';
import { UpdateAuthorDto } from '@/modules/authors/dto/update-auth.dto';
import { BooksService } from '@/modules/books/services/books.service';
import { DocResponse } from '@/modules/docs/dto/doc.decorator';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @ApiOperation({ summary: 'Create a new author' })
  @DocResponse('Author created Successfully', {
    httpStatus: HttpStatus.CREATED,
    dto: AuthorDto,
  })
  @ApiResponse('Author created Successfully')
  @Post()
  async createAuthor(@Body() authorDto: AuthorDto): Promise<AuthorDoc> {
    return this.authorsService.create(authorDto);
  }

  @ApiOperation({ summary: 'Get all authors with pagination!' })
  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: AuthorDto,
  })
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

  @ApiOperation({ summary: 'Get author by ID' })
  @DocResponse('Success', {
    httpStatus: HttpStatus.OK,
    dto: AuthorDto,
  })
  @ApiResponse()
  @Get(':id')
  async getAuthorById(@Param('id') id: string): Promise<AuthorDoc> {
    const author = await this.authorsService.findById(id);
    if (!author) throw new BadRequestException('Author not found!');
    return author;
  }

  @ApiOperation({ summary: 'Update an existing author' })
  @DocResponse('Author Updated Successfully', {
    httpStatus: HttpStatus.OK,
    dto: AuthorDto,
  })
  @ApiResponse('Author Updated Successfully')
  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
      @Body() authorDto: UpdateAuthorDto,
  ): Promise<AuthorDoc> {
    return this.authorsService.update(id, authorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @DocResponse('Author Deleted Successfully', {
    httpStatus: HttpStatus.OK,
    dto: AuthorDto,
  })
  @ApiResponse('Author Deleted Successfully!')
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<AuthorDoc> {
    const author = await this.authorsService.findById(id);
    if (!author) throw new BadRequestException('Author not found!');
    await this.booksService.deleteAllAuthorBooks(id);
    return this.authorsService.delete(id);
  }
}
