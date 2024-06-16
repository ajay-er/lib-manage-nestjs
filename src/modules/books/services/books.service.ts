import { Injectable } from '@nestjs/common';
import { BookRepository } from '@/modules/books/repository/repositories/books.repository';
import type { BookDoc } from '../repository/entities/books.entity';
import type { BookDto } from '@/modules/books/dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly bookRepository: BookRepository,
  ) {}

  async create(BookDto: BookDto): Promise<BookDoc> {
    return this.bookRepository.create(BookDto);
  }

  async findAll(page:number, limit:number): Promise<BookDoc[]> {
    return this.bookRepository.findAll(page, limit);
  }

  async findById(id: string): Promise<BookDoc> {
    return this.bookRepository.findById(id);
  }
}
