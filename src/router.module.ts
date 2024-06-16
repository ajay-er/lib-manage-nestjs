import { Module } from '@nestjs/common';
import { HealthModule } from '@/modules/health/health.module';
import { BooksModule } from '@/modules/books/books.module';
import { AuthorsModule } from '@/modules/authors/authors.module';

@Module({
  imports: [HealthModule, BooksModule, AuthorsModule],
})
export class RouterModule {}
