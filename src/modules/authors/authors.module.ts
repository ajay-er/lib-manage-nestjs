import { Module } from '@nestjs/common';
import { AuthorsRepositoryModule } from '@/modules/authors/repository/authors.repository.module';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import { AuthorsController } from '@/modules/authors/controllers/authors.controller';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [AuthorsRepositoryModule, BooksModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
