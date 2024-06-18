import { faker } from '@faker-js/faker';
import type { AuthorDto, AuthorResponseDto } from '../dto/auth.dto';
import type { AuthorDoc } from '../repository/entities/authors.entity';
import { Types } from 'mongoose';

export const mockAuthorRepository = {
  create: jest
    .fn()
    .mockImplementation((authorDto: AuthorDto):
    Promise<AuthorResponseDto> => Promise.resolve({
      biography: '',
      _id:
        '507f1f77bcf86cd799439011',
      ...authorDto,
    })),
  findAll: jest
    .fn()
    .mockImplementation((page: number, limit: number): Promise<AuthorDoc[]> => {
      const mockAuthors: AuthorDoc[] = Array.from({ length: 20 }, (_, _index) => ({
        _id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        biography: faker.person.bio(),
        birthDate: faker.date.past(),
      })) as AuthorDoc[];

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedAuthors = mockAuthors.slice(startIndex, endIndex);
      return Promise.resolve(paginatedAuthors);
    }),
  findById: jest.fn().mockImplementation((id: string): Promise<AuthorDoc | null> => {
    if (Types.ObjectId.isValid(id)) {
      return Promise.resolve({
        _id: id,
        name: 'John Doe',
        biography: 'A famous author',
        birthDate: new Date('1980-01-01'),
      } as AuthorDoc);
    }
    return Promise.resolve(null);
  }),
};
