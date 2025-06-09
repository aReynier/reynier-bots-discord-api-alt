import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

describe('TagsService', () => {
  let service: TagsService;
  let repository: Repository<Tag>;

  const mockTag = {
    idTag: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Tag',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    repository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un nouveau tag avec succès', async () => {
      const createTagDto: CreateTagDto = {
        name: 'Test Tag',
        description: 'Test Description',
      };

      mockRepository.create.mockReturnValue(mockTag);
      mockRepository.save.mockResolvedValue(mockTag);

      const result = await service.create(createTagDto);

      expect(result).toEqual(mockTag);
      expect(mockRepository.create).toHaveBeenCalledWith(createTagDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockTag);
    });

    it('devrait lever une ConflictException si le tag existe déjà', async () => {
      const createTagDto: CreateTagDto = {
        name: 'Test Tag',
        description: 'Test Description',
      };

      mockRepository.save.mockRejectedValue({ code: '23505' });

      await expect(service.create(createTagDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de tags', async () => {
      mockRepository.find.mockResolvedValue([mockTag]);

      const result = await service.findAll();

      expect(result).toEqual([mockTag]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner un tag par son id', async () => {
      mockRepository.findOne.mockResolvedValue(mockTag);

      const result = await service.findOne(mockTag.idTag);

      expect(result).toEqual(mockTag);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idTag: mockTag.idTag },
      });
    });

    it('devrait lever une NotFoundException si le tag n\'existe pas', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un tag avec succès', async () => {
      const updateTagDto: UpdateTagDto = {
        name: 'Updated Tag',
      };

      mockRepository.findOne.mockResolvedValue(mockTag);
      mockRepository.save.mockResolvedValue({ ...mockTag, ...updateTagDto });

      const result = await service.update(mockTag.idTag, updateTagDto);

      expect(result).toEqual({ ...mockTag, ...updateTagDto });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait lever une NotFoundException si le tag n\'existe pas', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('non-existent-id', {})).rejects.toThrow(NotFoundException);
    });

    it('devrait lever une ConflictException si le nouveau nom existe déjà', async () => {
      mockRepository.findOne.mockResolvedValue(mockTag);
      mockRepository.save.mockRejectedValue({ code: '23505' });

      await expect(service.update(mockTag.idTag, { name: 'Existing Tag' })).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un tag avec succès', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(mockTag.idTag);

      expect(mockRepository.delete).toHaveBeenCalledWith(mockTag.idTag);
    });

    it('devrait lever une NotFoundException si le tag n\'existe pas', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('non-existent-id')).rejects.toThrow(NotFoundException);
    });
  });
}); 