/* eslint-disable import/no-cycle */
import { Module, forwardRef } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { BooksRepositoryModule } from './repository/books.repository.module';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [BooksRepositoryModule, forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
