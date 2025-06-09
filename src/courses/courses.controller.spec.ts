import { Test } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  const mockCourse = {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Développeur web',
    isCertified: true,
    idCategory: '123456789012345678',
    idGuild: '123456789012345678',
    createdAt: new Date(),
    updatedAt: null,
  };

  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    getById: vi.fn(),
    updateById: vi.fn(),
    deleteById: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        {
          provide: CoursesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  describe('create', () => {
    it('should create a course', async () => {
      const dto: CreateCourseDto = {
        idCourse: '123456789012345678',
        name: 'Développeur web',
        isCertified: true,
        idCategory: '123456789012345678',
        idGuild: '123456789012345678',
        idRole: '123456789012345678'
      };

      mockService.create.mockResolvedValue({
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        ...dto,
        createdAt: expect.any(Date),
        updatedAt: null
    });

      const result = await controller.create(dto);

      expect(result).toHaveProperty('uuid');
      expect(result.name).toBe(dto.name);
      expect(result.isCertified).toBe(dto.isCertified);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = [mockCourse, { ...mockCourse, uuid: '456' }];
      mockService.findAll.mockResolvedValue(courses);

      const result = await controller.findAll();

      expect(result).toEqual(courses);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a course', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.getById.mockResolvedValue(mockCourse);

      const result = await controller.getById(uuid);

      expect(result).toEqual(mockCourse);
      expect(mockService.getById).toHaveBeenCalledWith(uuid);
    });
  });

  describe('updateById', () => {
    it('should update a course', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateCourseDto = {
        name: 'updated-course'
      };
      const updatedCourse = { ...mockCourse, ...updateDto };
      mockService.updateById.mockResolvedValue(updatedCourse);

      const result = await controller.updateById(uuid, updateDto);

      expect(result).toEqual(updatedCourse);
      expect(mockService.updateById).toHaveBeenCalledWith(uuid, updateDto);
    });
  });

  describe('deleteById', () => {
    it('should delete a course', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.deleteById.mockResolvedValue(undefined);

      await controller.deleteById(uuid);

      expect(mockService.deleteById).toHaveBeenCalledWith(uuid);
    });
  });
});