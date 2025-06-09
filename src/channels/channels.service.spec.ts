import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { Repository } from 'typeorm';
import { Guild } from '../guilds/entities/guild.entity';
import { Category } from '../categories/entities/category.entity';
import { Course } from '../courses/entities/course.entity';
import { Role } from '../roles/entities/role.entity';

describe('ChannelsService', () => {
  let service: ChannelsService;
  let repository: Repository<Channel>;

  const mockGuild: Partial<Guild> = {
    idGuild: '345678901234567890',
    name: 'test-guild',
    createdAt: new Date(),
    updatedAt: new Date(),
    channels: [],
    categories: [],
    courses: [],
    roles: []
  };

  const mockCategory: Partial<Category> = {
    idCategory: '234567890123456789',
    name: 'test-category',
    categoryPosition: 1,
    idGuild: '345678901234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
    channels: [],
    guild: mockGuild as Guild
  };

  const mockCourse: Partial<Course> = {
    idCourse: '456789012345678901',
    name: 'test-course',
    isCertified: true,
    idCategory: '234567890123456789',
    idGuild: '345678901234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: mockCategory as Category,
    guild: mockGuild as Guild,
    channels: [],
    promotions: []
  };

  const mockChannel: Partial<Channel> = {
    idChannel: '123456789012345678',
    name: 'test-channel',
    type: 'text',
    channelPosition: 1,
    idCategory: '234567890123456789',
    idGuild: '345678901234567890',
    idCourse: '456789012345678901',
    createdAt: new Date(),
    updatedAt: new Date(),
    category: mockCategory as Category,
    course: mockCourse as Course,
    guild: mockGuild as Guild
  };

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findOneBy: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    repository = mockRepository as unknown as Repository<Channel>;
    service = new ChannelsService(repository);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un nouveau channel', async () => {
      const createChannelDto = {
        idChannel: '123456789012345678',
        name: 'test-channel',
        type: 'text',
        channelPosition: 1,
        idCategory: '234567890123456789',
        idGuild: '345678901234567890'
      };

      const simpleChannel = {
        ...createChannelDto,
        idCourse: '456789012345678901',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockRepository.create.mockReturnValue(simpleChannel);
      mockRepository.save.mockResolvedValue(simpleChannel);

      const result = await service.create(createChannelDto);

      expect(result).toEqual(simpleChannel);
      expect(mockRepository.create).toHaveBeenCalledWith(createChannelDto);
      expect(mockRepository.save).toHaveBeenCalledWith(simpleChannel);
    });
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de channels', async () => {
      const channels = [mockChannel as Channel];
      mockRepository.find.mockResolvedValue(channels);

      const result = await service.findAll();

      expect(result).toEqual(channels);
      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['guild', 'category']
      });
    });
  });

  describe('findOne', () => {
    it('devrait retourner un channel par son id avec ses relations', async () => {
      mockRepository.findOne.mockResolvedValue(mockChannel as Channel);

      const result = await service.findOne(mockChannel.idChannel as string);

      expect(result).toEqual(mockChannel);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idChannel: mockChannel.idChannel as string },
        relations: ['guild', 'category']
      });
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un channel', async () => {
      const updateChannelDto = {
        name: 'updated-channel',
        type: 'voice',
        channelPosition: 2
      };
      const updatedChannel = { ...mockChannel, ...updateChannelDto };

      mockRepository.findOneBy.mockResolvedValue(mockChannel);
      mockRepository.save.mockResolvedValue(updatedChannel);

      const result = await service.update(mockChannel.idChannel as string, updateChannelDto);

      expect(result).toEqual(updatedChannel);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ idChannel: mockChannel.idChannel as string });
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('devrait retourner null si le channel à mettre à jour n\'existe pas', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.update('non-existent-id' as string, {});

      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ idChannel: 'non-existent-id' as string });
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('devrait supprimer un channel', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(mockChannel.idChannel as string);

      expect(mockRepository.delete).toHaveBeenCalledWith({ idChannel: mockChannel.idChannel as string });
    });
  });
}); 