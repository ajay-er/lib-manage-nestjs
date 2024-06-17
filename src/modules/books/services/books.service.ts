import { Injectable } from '@nestjs/common';
import { BookRepository } from '@/modules/books/repository/repositories/books.repository';
import type { BookDoc } from '../repository/entities/books.entity';
import type { BookDto } from '@/modules/books/dto/book.dto';
import type { DateDto } from '../dto/date.dto';

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

  async update(id: string, BookDto: Partial<BookDto>): Promise<BookDoc> {
    return this.bookRepository.update(id, BookDto);
  }

  async delete(id: string): Promise<BookDoc> {
    return this.bookRepository.delete(id);
  }

  async findAllAuthorBooks(authorId: string, page:number, limit:number): Promise<BookDoc[]> {
    return this.bookRepository.findAllAuthorBooks(authorId, page, limit);
  }

  async deleteAllAuthorBooks(authorId: string): Promise<unknown> {
    return this.bookRepository.deleteAllAuthorBooks(authorId);
  }

  async findAllWithinDateRange(dateDto: DateDto): Promise<BookDoc[]> {
    return this.bookRepository.findAllWithinDateRange(dateDto);
  }
}
