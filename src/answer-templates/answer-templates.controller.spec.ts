import { Test, TestingModule } from '@nestjs/testing';
import { AnswerTemplatesController } from './answer-templates.controller';
import { AnswerTemplatesService } from './answer-templates.service';
import { CreateAnswerQuestionTemplateDto } from './dto/create-answer-question-template.dto';
import { UpdateAnswerTemplateDto } from './dto/update-answer-template.dto';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AnswerTemplatesController', () => {
  let controller: AnswerTemplatesController;
  let service: AnswerTemplatesService;

  const mockAnswersService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerTemplatesController],
      providers: [
        {
          provide: AnswerTemplatesService,
          useValue: mockAnswersService,
        },
      ],
    }).compile();

    controller = module.get<AnswerTemplatesController>(AnswerTemplatesController);
    service = module.get<AnswerTemplatesService>(AnswerTemplatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new answer', async () => {
      const createAnswerQuestionDto: CreateAnswerQuestionTemplateDto = {
        content: 'Test answer',
        idQuestionTemplate: 'test-question-id'
      };
      const expectedResult = { id: 'test-id', ...createAnswerQuestionDto };

      mockAnswersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createAnswerQuestionDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createAnswerQuestionDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of answers', async () => {
      const expectedResult = [
        { id: 'id1', content: 'Answer 1', idQuestionTemplate: 'q-id1' },
        { id: 'id2', content: 'Answer 2', idQuestionTemplate: 'q-id2' }
      ];

      mockAnswersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single answer', async () => {
      const id = 'test-id';
      const expectedResult = {
        id,
        content: 'Test answer',
        idQuestionTemplate: 'q-id'
      };

      mockAnswersService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update an answer', async () => {
      const id = 'test-id';
      const updateAnswerDto: UpdateAnswerTemplateDto = {
        content: 'Updated answer'
      };
      const expectedResult = {
        id,
        ...updateAnswerDto,
        idQuestionTemplate: 'q-id'
      };

      mockAnswersService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateAnswerDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id, updateAnswerDto);
    });

    it('should throw NotFoundException when answer not found', async () => {
      const id = 'non-existent-id';
      const updateAnswerDto: UpdateAnswerTemplateDto = {
        content: 'Updated answer'
      };

      mockAnswersService.update.mockResolvedValue(null);

      await expect(controller.update(id, updateAnswerDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(id, updateAnswerDto);
    });
  });

  describe('remove', () => {
    it('should remove an answer', async () => {
      const id = 'test-id';
      const expectedResult = { deleted: true };

      mockAnswersService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
