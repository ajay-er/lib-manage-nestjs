import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import type { BookDoc } from '../entities/books.entity';
import { BookEntity } from '../entities/books.entity';
import { DatabaseModel } from '@/common/database/decorators/database.decorator';

@Injectable()
export class BookRepository {
  constructor(
    @DatabaseModel(BookEntity.name) private readonly bookModel: Model<BookEntity>,
  ) {}

  async findAll(): Promise<BookDoc[]> {
    return this.bookModel.find().exec();
  }
}
