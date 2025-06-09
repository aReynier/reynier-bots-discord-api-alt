import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardAccountService } from './dashboard-accounts.service';
import { DashboardAccount } from './entities/dashboard-account.entity';
import { Repository } from 'typeorm';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';

describe('DashboardAccountService', () => {
  let service: DashboardAccountService;
  let repository: Repository<DashboardAccount>;

  const mockDashboardAccount = {
    idDashboardAccount: '123e4567-e89b-12d3-a456-426614174000',
    idDiscord: '123456789012345678',
    email: 'test@example.com',
    password: 'hashedPassword123'
  };

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DashboardAccountService,
        {
          provide: getRepositoryToken(DashboardAccount),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardAccountService>(DashboardAccountService);
    repository = module.get<Repository<DashboardAccount>>(getRepositoryToken(DashboardAccount));
  });

  describe('create', () => {
    it('should create a dashboard account', async () => {
      const createDto = {
        email: 'test@example.com',
        password: 'password123'
      };

      mockRepository.create.mockReturnValue(mockDashboardAccount);
      mockRepository.save.mockResolvedValue(mockDashboardAccount);

      const createDtoWithId = {
        ...createDto,
        idDashboardAccount: mockDashboardAccount.idDashboardAccount,
        idDiscord: mockDashboardAccount.idDiscord
      };

      const result = await service.create(createDtoWithId);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockRepository.create).toHaveBeenCalledWith(createDtoWithId);
      expect(mockRepository.save).toHaveBeenCalledWith(mockDashboardAccount);
    });
  });

  describe('getById', () => {
    it('should return a dashboard account', async () => {
      const idDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
      mockRepository.findOne.mockResolvedValue(mockDashboardAccount);

      const result = await service.getById(idDashboardAccount);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idDashboardAccount }
      });
    });

    it('should throw NotFoundException when account not found', async () => {
      const idDashboardAccount = 'non-existent-uuid';
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.getById(idDashboardAccount)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteById', () => {
    it('should delete a dashboard account', async () => {
      const idDashboardAccount = '123e4567-e89b-12d3-a456-426614174000';
      mockRepository.findOne.mockResolvedValue(mockDashboardAccount);
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteById(idDashboardAccount);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idDashboardAccount }
      });
      expect(mockRepository.delete).toHaveBeenCalledWith({ idDashboardAccount });
    });

    it('should throw NotFoundException when account not found', async () => {
      const idDashboardAccount = 'non-existent-uuid';
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteById(idDashboardAccount)).rejects.toThrow(NotFoundException);
    });
  });
});