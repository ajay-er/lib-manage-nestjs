import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import type { BookDto } from '@/modules/books/dto/book.dto';
import type { DateDto } from '../dto/date.dto';
import type { BookDoc } from '../repository/entities/books.entity';

export const mockBookRepository = {
  create: jest
    .fn()
    .mockImplementation((bookDto: BookDto): Promise<BookDoc | null> => {
      if (Types.ObjectId.isValid(bookDto.authorId)) {
        return Promise.resolve({
          _id: faker.database.mongodbObjectId(),
          title: bookDto.title,
          description: bookDto.description,
          authorId: bookDto.authorId,
          publishedDate: bookDto.publishedDate,
        } as unknown as BookDoc);
      }
      return Promise.resolve(null);
    }),
  findAll: jest
    .fn()
    .mockImplementation((page: number, limit: number): Promise<BookDoc[]> => {
      const mockBooks: BookDoc[] = Array.from({ length: 20 }, (_, _index) => ({
        _id: faker.database.mongodbObjectId(),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        authorId: faker.database.mongodbObjectId(),
        publishedDate: faker.date.past(),
      })) as unknown as BookDoc[];

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedBooks = mockBooks.slice(startIndex, endIndex);
      return Promise.resolve(paginatedBooks);
    }),
  findById: jest.fn().mockImplementation((id: string): Promise<BookDoc | null> => {
    if (Types.ObjectId.isValid(id)) {
      return Promise.resolve({
        _id: id,
        title: 'Sample Book Title',
        description: 'Sample book description',
        authorId: faker.database.mongodbObjectId(),
        publishedDate: new Date('2000-01-01'),
      } as unknown as BookDoc);
    }
    return Promise.resolve(null);
  }),
  update: jest
    .fn()
    .mockImplementation(
      async (id: string, bookDto: Partial<BookDto>): Promise<BookDoc | null> => {
        if (!Types.ObjectId.isValid(id)) {
          return Promise.resolve(null);
        }

        const existingBook = await mockBookRepository.findById(id);

        if (!existingBook) {
          return Promise.resolve(null);
        }
        const updatedBook: BookDoc = {
          ...existingBook,
          ...bookDto,
        };

        return Promise.resolve(updatedBook);
      },
    ),
  delete: jest
    .fn()
    .mockImplementation(async (id: string): Promise<BookDoc | null> => {
      const existingBook = await mockBookRepository.findById(id);

      if (!existingBook) {
        return Promise.resolve(null);
      }

      return Promise.resolve(existingBook);
    }),
  findAllAuthorBooks: jest
    .fn()
    .mockImplementation((authorId: string, page: number, limit: number): Promise<BookDoc[]> => {
      const mockBooks: BookDoc[] = Array.from({ length: 20 }, (_, _index) => ({
        _id: faker.database.mongodbObjectId(),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        authorId,
        publishedDate: faker.date.past(),
      })) as unknown as BookDoc[];

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedBooks = mockBooks.slice(startIndex, endIndex);
      return Promise.resolve(paginatedBooks);
    }),
  deleteAllAuthorBooks: jest
    .fn()
    .mockImplementation(
      (_authorId: string):
      Promise<unknown> => Promise.resolve({ deletedCount: 20 }),
    ),
  findAllWithinDateRange: jest
    .fn()
    .mockImplementation((dateDto: DateDto): Promise<BookDoc[]> => {
      const mockBooks: BookDoc[] = Array.from({ length: 10 }, (_, _index) => ({
        _id: faker.database.mongodbObjectId(),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        authorId: faker.database.mongodbObjectId(),
        publishedDate: faker.date.between(dateDto.startDate, dateDto.endDate),
      })) as unknown as BookDoc[];

      return Promise.resolve(mockBooks);
    }),
};
