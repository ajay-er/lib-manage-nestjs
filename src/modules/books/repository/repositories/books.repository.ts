import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import type { BookDoc } from '../entities/books.entity';
import { Book } from '../entities/books.entity';
import { DatabaseModel } from '@/common/database/decorators/database.decorator';
import type { BookDto } from '@/modules/books/dto/book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @DatabaseModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(bookDto: BookDto): Promise<BookDoc> {
    return this.bookModel.create(bookDto);
  }

  async findAll(page: number, limit: number): Promise<BookDoc[]> {
    const skip = (page - 1) * limit;
    return this.bookModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<BookDoc> {
    return this.bookModel.findById(id);
  }
}
