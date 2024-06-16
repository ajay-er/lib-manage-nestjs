import { Module } from '@nestjs/common';
import { BookRepository } from '@/modules/books/repository/repositories/books.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@/modules/books/repository/entities/books.entity';
import { DATABASE_CONNECTION_NAME } from '@/common/database/constants/database.constant';

@Module({
  providers: [BookRepository],
  exports: [BookRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Book.name,
          schema: BookSchema,
        },
      ],
      DATABASE_CONNECTION_NAME,
    ),
  ],
})
export class BooksRepositoryModule { }
