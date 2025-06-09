import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorActionsController } from './moderator-actions.controller';
import { ModeratorActionsService } from './moderator-actions.service';
import { CreateModeratorActionDto, ActionType } from './dto/create-moderator-action.dto';
import { ModeratorAction } from './entities/moderator-action.entity';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ModeratorActionsController', () => {
  let controller: ModeratorActionsController;
  let service: ModeratorActionsService;

  const mockModeratorAction: ModeratorAction = {
    idModeration: '123e4567-e89b-12d3-a456-426614174000',
    actionType: 'warning',
    actionReason: 'Test reason',
    actionCreatedAt: new Date(),
    idModerator: '123e4567-e89b-12d3-a456-426614174001',
    idReport: '123e4567-e89b-12d3-a456-426614174002',
    updatedAt: new Date(),
  } as ModeratorAction;

  const mockCreateDto: CreateModeratorActionDto = {
    idMember: mockModeratorAction.idModerator,
    idReport: mockModeratorAction.idReport,
    type: ActionType.WARN,
    reason: mockModeratorAction.actionReason,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeratorActionsController],
      providers: [
        {
          provide: ModeratorActionsService,
          useValue: {
            create: vi.fn().mockResolvedValue(mockModeratorAction),
            findAll: vi.fn().mockResolvedValue([mockModeratorAction]),
            findOne: vi.fn().mockResolvedValue(mockModeratorAction),
            remove: vi.fn(),
            findByReport: vi.fn().mockResolvedValue([mockModeratorAction]),
          },
        },
      ],
    }).compile();

    controller = module.get<ModeratorActionsController>(ModeratorActionsController);
    service = module.get<ModeratorActionsService>(ModeratorActionsService);
  });

  describe('create', () => {
    it('devrait créer une nouvelle action de modération', async () => {
      const result = await controller.create(mockCreateDto, mockModeratorAction.idModerator);
      expect(result).toEqual(mockModeratorAction);
      expect(service.create).toHaveBeenCalledWith(mockCreateDto);
    });

    it('devrait lever une exception si l\'id du membre ne correspond pas', async () => {
      await expect(
        controller.create(mockCreateDto, 'different-uuid')
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('devrait retourner toutes les actions de modération', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockModeratorAction]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('devrait retourner une action de modération spécifique', async () => {
      const result = await controller.findOne(mockModeratorAction.idModeration);
      expect(result).toEqual(mockModeratorAction);
      expect(service.findOne).toHaveBeenCalledWith(mockModeratorAction.idModeration);
    });

    it('devrait gérer les actions non trouvées', async () => {
      vi.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());
      await expect(
        controller.findOne('invalid-uuid')
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer une action de modération', async () => {
      await controller.remove(mockModeratorAction.idModeration);
      expect(service.remove).toHaveBeenCalledWith(mockModeratorAction.idModeration);
    });
  });

  describe('findByReport', () => {
    it('devrait retourner les actions de modération pour un signalement', async () => {
      const result = await controller.findByReport(mockModeratorAction.idReport);
      expect(result).toEqual([mockModeratorAction]);
      expect(service.findByReport).toHaveBeenCalledWith(mockModeratorAction.idReport);
    });

    it('devrait gérer les signalements non trouvés', async () => {
      vi.spyOn(service, 'findByReport').mockRejectedValueOnce(new NotFoundException());
      await expect(
        controller.findByReport('invalid-uuid')
      ).rejects.toThrow(NotFoundException);
    });
  });
}); 