import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '@/modules/authors/repository/repositories/authors.repository';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorRepository: AuthorRepository,
  ) {}

  async findAll(): Promise<AuthorDoc[]> {
    return this.authorRepository.findAll();
  }
}
