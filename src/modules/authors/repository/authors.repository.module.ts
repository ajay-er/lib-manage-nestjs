import { Module } from '@nestjs/common';
import { AuthorRepository } from '@/modules/authors/repository/repositories/authors.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from '@/modules/authors/repository/entities/authors.entity';
import { DATABASE_CONNECTION_NAME } from '@/common/database/constants/database.constant';

@Module({
  providers: [AuthorRepository],
  exports: [AuthorRepository],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Author.name,
          schema: AuthorSchema,
        },
      ],
      DATABASE_CONNECTION_NAME,
    ),
  ],
})
export class AuthorsRepositoryModule {}
