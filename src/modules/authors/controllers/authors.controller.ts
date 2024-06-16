import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@/common/response/decorators/response.decorator';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly bookService: AuthorsService,
  ) {}

  @Get()
  @ApiResponse()
  async findAll(): Promise<AuthorDoc[]> {
    return this.bookService.findAll();
  }
}
