import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookRepository } from '../repository/repositories/books.repository';
import { mockBookRepository } from '../__mocks__/books.repository.mock';
import { faker } from '@faker-js/faker';
import type { BookDoc } from '../repository/entities/books.entity';

describe('BooksService', () => {
  let service: BooksService;
  let repositoryMock: Partial<BookRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BookRepository, useValue: mockBookRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repositoryMock = module.get<BookRepository>(BookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const newBookDto = {
        title: 'Sample Book Title',
        description: 'Sample book description',
        authorId: faker.database.mongodbObjectId(),
        publishedDate: new Date('2024-06-18'),
      };

      const newBookId = faker.database.mongodbObjectId();

      repositoryMock.create = jest.fn().mockResolvedValue({
        ...newBookDto,
        _id: newBookId,
      });

      const createdBook = await service.create(newBookDto);

      expect(createdBook).toBeDefined();
      expect(createdBook._id).toEqual(newBookId);
      expect(createdBook.title).toEqual(newBookDto.title);
      expect(createdBook.description).toEqual(newBookDto.description);
      expect(createdBook.authorId).toEqual(newBookDto.authorId);
      expect(createdBook.publishedDate).toEqual(newBookDto.publishedDate);
    });

    it('should return null when authorId is invalid', async () => {
      const invalidAuthorIdDto = {
        title: 'Sample Book Title',
        description: 'Sample book description',
        authorId: 'invalid_id',
        publishedDate: new Date('2024-06-18'),
      };
      repositoryMock.create = jest.fn().mockResolvedValue(null);

      const createdBook = await service.create(invalidAuthorIdDto);

      expect(createdBook).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return paginated books successfully', async () => {
      const page = 1;
      const limit = 10;
      const result = await service.findAll(page, limit);

      expect(result).toHaveLength(limit);
      expect(result.every((book) => book instanceof Object)).toBe(true);
    });

    it('should return empty array when page is out of range', async () => {
      const page = 3;
      const limit = 10;
      repositoryMock.findAll = jest.fn().mockResolvedValue([]);
      const result = await service.findAll(page, limit);
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return a book when a valid ID is provided', async () => {
      const validBookId = faker.database.mongodbObjectId();
      const foundBook = await service.findById(validBookId);

      expect(foundBook).toBeDefined();
      expect(foundBook?._id).toEqual(validBookId);
    });

    it('should return null when an invalid ID is provided', async () => {
      const invalidBookId = 'invalid_id';
      repositoryMock.findById = jest.fn().mockResolvedValue(null);

      const foundBook = await service.findById(invalidBookId);

      expect(foundBook).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing book successfully', async () => {
      const existingBookId = faker.database.mongodbObjectId();
      const updatedBookDto = {
        title: 'Updated Title',
        description: 'Updated description',
      };
      const existingBook = {
        _id: existingBookId,
        title: 'Sample Book Title',
        description: 'Sample book description',
        authorId: faker.database.mongodbObjectId(),
        publishedDate: new Date('2000-01-01'),
      } as unknown as BookDoc;

      repositoryMock.findById = jest.fn().mockResolvedValue(existingBook);

      const updatedBook = await service.update(existingBookId, updatedBookDto);

      expect(updatedBook).toBeDefined();
      expect(updatedBook?._id).toEqual(existingBookId);
      expect(updatedBook?.title).toEqual(updatedBookDto.title);
      expect(updatedBook?.description).toEqual(updatedBookDto.description);
    });

    it('should return null when an invalid ID is provided', async () => {
      const invalidBookId = 'invalid_id';
      repositoryMock.update = jest.fn().mockResolvedValue(null);
      const updatedBook = await service.update(invalidBookId, {});
      expect(updatedBook).toBeNull();
    });

    it('should return null when the book with the provided ID does not exist', async () => {
      const nonExistingBookId = faker.database.mongodbObjectId();
      repositoryMock.findById = jest.fn().mockResolvedValue(null);
      repositoryMock.update = jest.fn().mockResolvedValue(null);
      const updatedBook = await service.update(nonExistingBookId, {});
      expect(updatedBook).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete an existing book successfully', async () => {
      const existingBookId = faker.database.mongodbObjectId();
      const existingBook = {
        _id: existingBookId,
        title: 'Sample Book Title',
        description: 'Sample book description',
        authorId: faker.database.mongodbObjectId(),
        publishedDate: new Date('2000-01-01'),
      } as unknown as BookDoc;
      repositoryMock.findById = jest.fn().mockResolvedValue(existingBook);
      repositoryMock.delete = jest.fn().mockResolvedValue(existingBook);
      const deletedBook = await service.delete(existingBookId);

      expect(deletedBook).toEqual(existingBook);
    });

    it('should return null when the book with the provided ID does not exist', async () => {
      const nonExistingBookId = faker.database.mongodbObjectId();
      repositoryMock.findById = jest.fn().mockResolvedValue(null);
      repositoryMock.delete = jest.fn().mockResolvedValue(null);
      const deletedBook = await service.delete(nonExistingBookId);

      expect(deletedBook).toBeNull();
    });
  });
});
