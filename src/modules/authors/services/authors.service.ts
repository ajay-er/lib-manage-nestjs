import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '@/modules/authors/repository/repositories/authors.repository';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';
import type { AuthorDto } from '@/modules/authors/dto/auth.dto';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorRepository: AuthorRepository,

  ) {}

  async create(authorDto: AuthorDto): Promise<AuthorDoc> {
    return this.authorRepository.create(authorDto);
  }

  async findAll(page:number, limit: number): Promise<AuthorDoc[]> {
    return this.authorRepository.findAll(page, limit);
  }

  async findById(id: string): Promise<AuthorDoc> {
    return this.authorRepository.findById(id);
  }

  async update(id: string, authorDto: Partial<AuthorDto>): Promise<AuthorDoc> {
    return this.authorRepository.update(id, authorDto);
  }

  async delete(id: string): Promise<AuthorDoc> {
    return this.authorRepository.delete(id);
  }
}
