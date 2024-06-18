import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { DatabaseModel } from '@/common/database/decorators/database.decorator';
import type { AuthorDoc } from '@/modules/authors/repository/entities/authors.entity';
import { Author } from '@/modules/authors/repository/entities/authors.entity';
import type { AuthorDto, AuthorResponseDto } from '@/modules/authors/dto/auth.dto';

@Injectable()
export class AuthorRepository {
  constructor(
    @DatabaseModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(authorDto: AuthorDto): Promise<AuthorResponseDto> {
    return (await this.authorModel.create(authorDto)).toObject() as AuthorResponseDto;
  }

  async findAll(page:number, limit:number): Promise<AuthorDoc[]> {
    const skip = (page - 1) * limit;
    return this.authorModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<AuthorDoc> {
    const objectId = new Types.ObjectId(id);
    return this.authorModel.findById(objectId).exec();
  }

  async update(id: string, authorDto: Partial<AuthorDto>): Promise<AuthorDoc> {
    return this.authorModel.findByIdAndUpdate(id, authorDto, { new: true }).exec();
  }

  async delete(id: string): Promise<AuthorDoc> {
    const deletedAuthor = await this.findById(id);
    await deletedAuthor.deleteOne();
    return deletedAuthor;
  }
}
