import { Module } from '@nestjs/common';
import { AuthorsRepositoryModule } from '@/modules/authors/repository/authors.repository.module';
import { AuthorsService } from '@/modules/authors/services/authors.service';
import { AuthorsController } from '@/modules/authors/controllers/authors.controller';

@Module({
  imports: [AuthorsRepositoryModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
