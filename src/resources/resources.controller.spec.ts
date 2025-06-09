import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';

describe('ResourcesController', () => {
  let controller: ResourcesController;
  let service: ResourcesService;

  const mockResourcesService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    findComments: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useValue: mockResourcesService,
        },
      ],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
    service = module.get<ResourcesService>(ResourcesService);

    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new resource', async () => {
      // Arrange
      const createResourceDto: CreateResourceDto = {
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
        idMember: '123e4567-e89b-12d3-a456-426614174000',
      };

      const expectedResult = {
        idResource: '123e4567-e89b-12d3-a456-426614174001',
        ...createResourceDto,
        creator: {
          idMember: createResourceDto.idMember,
          username: 'testuser',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockResourcesService.create.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.create(createResourceDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(createResourceDto);
      expect(result).toBe(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      // Arrange
      const expectedResult = [
        {
          idResource: '123e4567-e89b-12d3-a456-426614174001',
          title: 'First Resource',
          description: 'First Description',
          content: 'First Content',
          status: 'active',
          creator: {
            idMember: '123e4567-e89b-12d3-a456-426614174000',
            username: 'testuser',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idResource: '123e4567-e89b-12d3-a456-426614174002',
          title: 'Second Resource',
          description: 'Second Description',
          content: 'Second Content',
          status: 'active',
          creator: {
            idMember: '123e4567-e89b-12d3-a456-426614174000',
            username: 'testuser',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockResourcesService.findAll.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      const expectedResult = {
        idResource: idResource,
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
        creator: {
          idMember: '123e4567-e89b-12d3-a456-426614174000',
          username: 'testuser',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockResourcesService.findOne.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findOne(idResource);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(idResource);
      expect(result).toBe(expectedResult);
    });

    it('should throw NotFoundException when resource does not exist', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      mockResourcesService.findOne.mockRejectedValue(
        new NotFoundException(`Resource with id ${idResource} not found`)
      );

      // Act & Assert
      await expect(controller.findOne(idResource)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(idResource);
    });
  });

  describe('update', () => {
    it('should update a resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      const updateResourceDto: UpdateResourceDto = {
        title: 'Updated Resource',
        description: 'Updated Description',
      };

      const expectedResult = {
        idResource: idResource,
        ...updateResourceDto,
        content: 'Original Content',
        status: 'active',
        creator: {
          idMember: '123e4567-e89b-12d3-a456-426614174000',
          username: 'testuser',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockResourcesService.update.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.update(idResource, updateResourceDto);
      expect(result).toBe(expectedResult);
    });

    it('should throw NotFoundException when updating non-existent resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      const updateResourceDto: UpdateResourceDto = {
        title: 'Updated Resource',
      };

      mockResourcesService.update.mockRejectedValue(
        new NotFoundException(`Resource with id ${idResource} not found`)
      );

      // Act & Assert
      await expect(controller.update(idResource, updateResourceDto)).rejects.toThrow(
        NotFoundException
      );
      expect(service.update).toHaveBeenCalledWith(idResource, updateResourceDto);
    });
  });

  describe('remove', () => {
    it('should remove a resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      mockResourcesService.remove.mockResolvedValue(undefined);

      // Act
      await controller.remove(idResource);

      // Assert
      expect(service.remove).toHaveBeenCalledWith(idResource);
    });

    it('should throw NotFoundException when removing non-existent resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      mockResourcesService.remove.mockRejectedValue(
        new NotFoundException(`Resource with id ${idResource} not found`)
      );

      // Act & Assert
      await expect(controller.remove(idResource)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(idResource);
    });
  });

  describe('findComments', () => {
    it('should return comments for a resource', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      const expectedResult = [
        {
          idComment: '123e4567-e89b-12d3-a456-426614174002',
          content: 'First Comment',
          member: {
            idMember: '123e4567-e89b-12d3-a456-426614174000',
            username: 'testuser',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idComment: '123e4567-e89b-12d3-a456-426614174003',
          content: 'Second Comment',
          member: {
            idMember: '123e4567-e89b-12d3-a456-426614174000',
            username: 'testuser',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockResourcesService.findComments.mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findComments(idResource);

      // Assert
      expect(service.findComments).toHaveBeenCalledWith(idResource);
      expect(result).toBe(expectedResult);
    });

    it('should throw NotFoundException when resource does not exist', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      mockResourcesService.findComments.mockRejectedValue(
        new NotFoundException(`Resource with id ${idResource} not found`)
      );

      // Act & Assert
      await expect(controller.findComments(idResource)).rejects.toThrow(NotFoundException);
      expect(service.findComments).toHaveBeenCalledWith(idResource);
    });

    it('should return empty array when resource has no comments', async () => {
      // Arrange
      const idResource = '123e4567-e89b-12d3-a456-426614174001';
      mockResourcesService.findComments.mockResolvedValue([]);

      // Act
      const result = await controller.findComments(idResource);

      // Assert
      expect(service.findComments).toHaveBeenCalledWith(idResource);
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });
  });
}); 