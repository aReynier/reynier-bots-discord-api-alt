import { Test } from '@nestjs/testing';
import { DashboardAccountController } from './dashboard-accounts.controller';
import { DashboardAccountService } from './dashboard-accounts.service';
import { CreateDashboardAccountDto } from './dto/create-dashboard-account.dto';
import { UpdateDashboardAccountDto } from './dto/update-dashboard-account.dto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validate } from 'class-validator';

describe('DashboardAccountController', () => {
  let controller: DashboardAccountController;
  let service: DashboardAccountService;

  const mockDashboardAccount = {
    email: 'test@example.com',
    password: 'hashedPassword123'
  };

  const mockService = {
    create: vi.fn(),
    getById: vi.fn(),
    updateById: vi.fn(),
    deleteById: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DashboardAccountController],
      providers: [
        {
          provide: DashboardAccountService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DashboardAccountController>(DashboardAccountController);
    service = module.get<DashboardAccountService>(DashboardAccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a dashboard account', async () => {
      const dto: CreateDashboardAccountDto = {
        idDashboardAccount: '123456789012345678',
        idDiscord: '123456789012345678',
        email: 'test@example.com',
        password: 'password123' 
      };

      mockService.create.mockResolvedValue(mockDashboardAccount);

      const result = await controller.create(dto);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });

    describe('validation', () => {
      it('should reject invalid email', async () => {
        const invalidDto = new CreateDashboardAccountDto();
        invalidDto.idDashboardAccount = '123456789012345678';
        invalidDto.idDiscord = '123456789012345678';
        invalidDto.email = 'invalid-email';
        invalidDto.password = 'ValidPassword123!';

        const errors = await validate(invalidDto);
        expect(errors.length).toBeGreaterThan(0);
        const emailError = errors.find(err => err.property === 'email');
        expect(emailError).toBeDefined();
        expect(emailError?.constraints?.isEmail).toBeDefined();
      });

      it('should reject password that is too short', async () => {
        const invalidDto = new CreateDashboardAccountDto();
        invalidDto.idDashboardAccount = '123456789012345678';
        invalidDto.idDiscord = '123456789012345678';
        invalidDto.email = 'valid@example.com';
        invalidDto.password = 'short';

        const errors = await validate(invalidDto);
        
        const passwordErrors = errors.find(err => err.property === 'password');
        expect(passwordErrors).toBeDefined();
        expect(passwordErrors?.constraints).toHaveProperty('minLength');
      });

      it('should reject invalid Discord IDs', async () => {
        const invalidDto = new CreateDashboardAccountDto();
        invalidDto.idDashboardAccount = 'invalid-id';
        invalidDto.idDiscord = 'invalid-id';
        invalidDto.email = 'valid@example.com';
        invalidDto.password = 'ValidPassword123!';

        const errors = await validate(invalidDto);
        expect(errors.length).toBeGreaterThan(0);
        
        const idDiscordError = errors.find(err => err.property === 'idDiscord');
        expect(idDiscordError).toBeDefined();
        expect(idDiscordError?.constraints?.matches).toBeDefined();

        const idDashboardError = errors.find(err => err.property === 'idDashboardAccount');
        expect(idDashboardError).toBeDefined();
        expect(idDashboardError?.constraints?.matches).toBeDefined();
      });

      it('should accept a valid DTO', async () => {
        const validDto = new CreateDashboardAccountDto();
        validDto.idDashboardAccount = '123456789012345678';
        validDto.idDiscord = '123456789012345678';
        validDto.email = 'valid@example.com';
        validDto.password = 'ValidPassword123!';

        const errors = await validate(validDto);
        expect(errors).toHaveLength(0);
      });

      it('should reject missing required fields', async () => {
        const emptyDto = new CreateDashboardAccountDto();
        
        const errors = await validate(emptyDto);
        expect(errors).toHaveLength(4);
        
        errors.forEach(error => {
          expect(error.constraints).toBeDefined();
          expect(error.constraints?.isNotEmpty).toBeDefined();
        });
      });
    });
  });

  describe('getById', () => {
    it('should return a single dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.getById.mockResolvedValue(mockDashboardAccount);

      const result = await controller.getById(uuid);

      expect(result).toEqual(mockDashboardAccount);
      expect(mockService.getById).toHaveBeenCalledWith(uuid);
    });
  });

  describe('updateById', () => {
    it('should update a dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateDashboardAccountDto = {
          email: 'updated@example.com',
          password: ''
      };
      const updatedAccount = { ...mockDashboardAccount, ...updateDto };
      mockService.updateById.mockResolvedValue(updatedAccount);

      const result = await controller.updateById(uuid, updateDto);

      expect(result).toEqual(updatedAccount);
      expect(mockService.updateById).toHaveBeenCalledWith(uuid, updateDto);
    });
  });

  describe('deleteById', () => {
    it('should delete a dashboard account', async () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      mockService.deleteById.mockResolvedValue(undefined);

      await controller.deleteById(uuid);

      expect(mockService.deleteById).toHaveBeenCalledWith(uuid);
    });
  });
});