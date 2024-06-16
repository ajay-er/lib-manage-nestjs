import { Module } from '@nestjs/common';
import { BooksController } from './controllers/books.controller';
import { BooksService } from './services/books.service';
import { BooksRepositoryModule } from './repository/books.repository.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
  imports: [BooksRepositoryModule],
})
export class BooksModule {}
