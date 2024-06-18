import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from '../repository/repositories/authors.repository';
import { mockAuthorRepository } from '../__mocks__/author.repository.mock';
import { faker } from '@faker-js/faker';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repositoryMock: Partial<AuthorRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: AuthorRepository, useValue: mockAuthorRepository },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repositoryMock = module.get<AuthorRepository>(AuthorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author and return response with new author details with id', async () => {
      const authorDto = {
        name: 'John Doe',
        biography: 'Am Great Author!',
        birthDate: new Date('1998-08-22'),
      };

      const createdAuthor = {
        _id: '507f1f77bcf86cd799439011',
        ...authorDto,
      };

      expect(await service.create(authorDto)).toEqual(createdAuthor);
      expect(repositoryMock.create).toHaveBeenCalledWith(authorDto);
    });

    it('should throw an error if author creation fails', async () => {
      const authorDto = {
        name: 'John Doe',
        biography: 'Am Great Author!',
        birthDate: new Date('1998-08-22'),
      };

      const errorMessage = 'Failed to create author';

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error(errorMessage));

      await expect(service.create(authorDto)).rejects.toThrow(errorMessage);
    });
  });

  describe('findAll', () => {
    it.each([
      [1, 10],
      [2, 10],
    ])('should return an array of authors with pagination for page %i and limit %i', async (page, limit) => {
      const authors = await service.findAll(page, limit);

      expect(authors).toHaveLength(limit);
    });

    it('should handle empty result from repository', async () => {
      const page = 1;
      const limit = 10;
      repositoryMock.findAll = jest.fn().mockResolvedValue([]);
      const authors = await service.findAll(page, limit);
      expect(authors).toHaveLength(0);
    });
  });

  describe('findById', () => {
    it('should return an author when ID exists', async () => {
      const authorId = faker.database.mongodbObjectId();
      const author = await service.findById(authorId);
      expect(author).toBeDefined();
      expect(author?._id).toEqual(authorId);
    });

    it('should return null when ID does not exist', async () => {
      const authorId = 'invalid_objectId';
      const author = await service.findById(authorId);
      expect(author).toBeNull();
    });

    it('should handle errors', async () => {
      const authorId = faker.database.mongodbObjectId();
      repositoryMock.findById = jest.fn().mockRejectedValue(new Error('Author Not Found!'));
      await expect(service.findById(authorId)).rejects.toThrow('Author Not Found!');
    });
  });

  describe('update', () => {
    it('should update an existing author with provided data', async () => {
      const id = faker.database.mongodbObjectId();
      const updatedData = { biography: 'Updated biography' };

      repositoryMock.findById = jest.fn().mockResolvedValue({
        _id: id,
        name: 'John Doe',
        biography: 'A famous author',
        birthDate: new Date('1980-01-01'),
      });

      const updatedAuthor = await service.update(id, updatedData);

      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor._id).toBe(id);
      expect(updatedAuthor.biography).toBe(updatedData.biography);
    });

    it('should handle errors when updating non-existent author', async () => {
      const id = 'invalidID';
      const updatedData = { biography: 'Updated biography' };

      repositoryMock.update = jest.fn().mockRejectedValue(new Error('Author Not Found!'));

      await expect(service.update(id, updatedData)).rejects.toThrow('Author Not Found!');
    });
  });
});
