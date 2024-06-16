import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseModel } from '@/common/database/decorators/database.decorator';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';
import { Author } from '@/modules/authors/repository/entities/authors.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @DatabaseModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async findAll(): Promise<AuthorDoc[]> {
    return this.authorModel.find().exec();
  }
}
