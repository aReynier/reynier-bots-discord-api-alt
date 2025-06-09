import { Test, TestingModule } from '@nestjs/testing';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { CreateAnswerQuestionDto } from './dto/create-answer-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AnswersController', () => {
  let controller: AnswersController;
  let service: AnswersService;

  const mockAnswersService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        {
          provide: AnswersService,
          useValue: mockAnswersService,
        },
      ],
    }).compile();

    controller = module.get<AnswersController>(AnswersController);
    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new answer', async () => {
      const createAnswerQuestionDto: CreateAnswerQuestionDto = {
        content: 'Test answer',
        idQuestion: 'test-question-id'
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
        { id: 'id1', content: 'Answer 1', idQuestion: 'q-id1' },
        { id: 'id2', content: 'Answer 2', idQuestion: 'q-id2' }
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
        idQuestion: 'q-id'
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
      const updateAnswerDto: UpdateAnswerDto = {
        content: 'Updated answer'
      };
      const expectedResult = {
        id,
        ...updateAnswerDto,
        idQuestion: 'q-id'
      };

      mockAnswersService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateAnswerDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id, updateAnswerDto);
    });

    it('should throw NotFoundException when answer not found', async () => {
      const id = 'non-existent-id';
      const updateAnswerDto: UpdateAnswerDto = {
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
