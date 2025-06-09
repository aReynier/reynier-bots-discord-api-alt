import { Test } from '@nestjs/testing';
import { GuildsTemplatesController } from './guilds-templates.controller';
import { GuildsTemplatesService } from './guilds-templates.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('GuildsTemplatesController', () => {
  let controller: GuildsTemplatesController;
  let service: GuildsTemplatesService;

  const mockService = {
    create: vi.fn(),
    findAll: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GuildsTemplatesController],
      providers: [
        {
          provide: GuildsTemplatesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<GuildsTemplatesController>(GuildsTemplatesController);
    service = module.get<GuildsTemplatesService>(GuildsTemplatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new guild template', async () => {
      const createDto = {
        idGuildTemplate: '123456789012345678',
        name: 'Test Template',
        description: 'Test Description',
        configuration: {
          welcomeChannel: '123456789',
          prefix: '!',
          language: 'fr'
        }
      };
      const expectedResult = { id: 1, ...createDto };
      mockService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of guild templates', async () => {
      const expectedResult = [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' },
      ];
      mockService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a guild template by id', async () => {
      const idGuildTemplate = '123456789012345678';
      const expectedResult = { id: 1, name: 'Template 1' };
      mockService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(idGuildTemplate);

      expect(service.findOne).toHaveBeenCalledWith(idGuildTemplate);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a guild template', async () => {
      const idGuildTemplate = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      const expectedResult = { id: 1, ...updateDto };
      mockService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(idGuildTemplate, updateDto);

      expect(service.update).toHaveBeenCalledWith(idGuildTemplate, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a guild template', async () => {
      const idGuildTemplate = '123456789012345678';
      mockService.remove.mockResolvedValue(undefined);

      await controller.remove(idGuildTemplate);

      expect(service.remove).toHaveBeenCalledWith(idGuildTemplate);
    });
  });
});
