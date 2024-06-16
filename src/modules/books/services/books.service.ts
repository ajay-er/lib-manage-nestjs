import { Injectable } from '@nestjs/common';
import { BookRepository } from '@/modules/books/repository/repositories/books.repository';
import type { BookDoc } from '../repository/entities/books.entity';

@Injectable()
export class BooksService {
  constructor(
    private readonly bookRepository: BookRepository,
  ) {}

  async findAll(): Promise<BookDoc[]> {
    return this.bookRepository.findAll();
  }
}
