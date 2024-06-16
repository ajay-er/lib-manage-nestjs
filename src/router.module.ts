import { Module } from '@nestjs/common';
import { HealthModule } from '@/modules/health/health.module';
import { BooksModule } from '@/modules/books/books.module';

@Module({
  imports: [HealthModule, BooksModule],
})
export class RouterModule {}
