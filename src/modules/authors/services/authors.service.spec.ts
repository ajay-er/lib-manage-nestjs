import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { AuthorRepository } from '../repository/repositories/authors.repository';
import type { AuthorDto, AuthorResponseDto } from '../dto/auth.dto';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repositoryMock: Partial<AuthorRepository>;

  const mockAuthorRepository = {
    create: jest
      .fn()
      .mockImplementation((authorDto: AuthorDto):
      Promise<AuthorResponseDto> => Promise.resolve({ biography: '', _id: '60d0fe4f5311236168a109ca', ...authorDto })),
  };

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
        _id: '60d0fe4f5311236168a109ca',
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
});
