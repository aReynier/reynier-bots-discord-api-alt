import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IdentificationRequestsService } from './identification-requests.service';
import { Repository } from 'typeorm';
import { IdentificationRequest } from './entities/identification-request.entity';
import { CreateIdentificationRequestDto } from './dto/create-identification-request.dto';
import { UpdateIdentificationRequestDto } from './dto/update-identification-request.dto';

const mockRepository = {
  create: vi.fn(),
  save: vi.fn(),
  find: vi.fn(),
  findOneBy: vi.fn(),
  delete: vi.fn(),
};

describe('IdentificationRequestsService', () => {
  let service: IdentificationRequestsService;

  beforeEach(() => {
    service = new IdentificationRequestsService(mockRepository as unknown as Repository<IdentificationRequest>);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new identification request', async () => {
    const dto: CreateIdentificationRequestDto = {
      idMember: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    const entity = { ...dto };
    mockRepository.create.mockReturnValue(entity);
    mockRepository.save.mockResolvedValue(entity);

    expect(await service.create(dto)).toEqual(entity);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(mockRepository.save).toHaveBeenCalledWith(entity);
  });

  it('should return an array of identification requests', async () => {
    const result = [{ uuid: '123e4567-e89b-12d3-a456-426614174000', idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000', firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' }];
    mockRepository.find.mockResolvedValue(result);
    expect(await service.findAll()).toEqual(result);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should return a single identification request', async () => {
    const mockIdentificationRequest = {
      idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000',
      idMember: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    mockRepository.findOneBy.mockResolvedValue(mockIdentificationRequest);
    expect(await service.findOne('123e4567-e89b-12d3-a456-426614174000')).toEqual(mockIdentificationRequest);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ 
      idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000' 
    });
  });

  it('should update an identification request', async () => {
    const dto: UpdateIdentificationRequestDto = { firstName: 'Jane' };
    const mockIdentificationRequest = {
      idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000',
      idMember: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    const updatedRequest = { 
      ...mockIdentificationRequest,
      firstName: 'Jane'
    };
    mockRepository.findOneBy.mockResolvedValue(mockIdentificationRequest);
    mockRepository.save.mockResolvedValue(updatedRequest);

    expect(await service.update('123e4567-e89b-12d3-a456-426614174000', dto)).toEqual(updatedRequest);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ 
      idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000' 
    });
    expect(mockRepository.save).toHaveBeenCalledWith(updatedRequest);
  });

  it('should delete an identification request', async () => {
    mockRepository.delete.mockResolvedValue({ affected: 1 });
    expect(await service.remove('123e4567-e89b-12d3-a456-426614174000')).toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith({
      idIdentificationRequest: '123e4567-e89b-12d3-a456-426614174000'
    });
  });
});

