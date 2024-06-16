import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import type { BookDoc } from '../entities/books.entity';
import { Book } from '../entities/books.entity';
import { DatabaseModel } from '@/common/database/decorators/database.decorator';

@Injectable()
export class BookRepository {
  constructor(
    @DatabaseModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<BookDoc[]> {
    return this.bookModel.find().exec();
  }
}
