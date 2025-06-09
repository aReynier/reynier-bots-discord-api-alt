import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuildsTemplatesService } from './guilds-templates.service';
import { GuildTemplate } from './entities/guild-template.entity';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('GuildsTemplatesService', () => {
  let service: GuildsTemplatesService;
  let repository: Repository<GuildTemplate>;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOneBy: vi.fn(),
    findOne: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GuildsTemplatesService,
        {
          provide: getRepositoryToken(GuildTemplate),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GuildsTemplatesService>(GuildsTemplatesService);
    repository = module.get<Repository<GuildTemplate>>(getRepositoryToken(GuildTemplate));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new guild template', async () => {
      const createDto = {
        idGuildTemplate: '123456789012345678',
        idGuild: '123456789012345678',
        idCategory: '123456789012345678',
        name: 'Test Template',
        description: 'Test Description',
        configuration: {
          idWelcomeChannel: '123456789',
          prefix: '!',
          language: 'fr'
        }
      };

      const newTemplate = { 
        ...createDto,
        idGuildTemplate: '123456789012345678',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockRepository.create.mockReturnValue(newTemplate);
      mockRepository.save.mockResolvedValue(newTemplate);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(newTemplate);
      expect(result).toEqual(newTemplate);
    });
  });

  describe('findAll', () => {
    it('should return an array of guild templates', async () => {
      const templates = [
        { 
          idGuildTemplate: '123456789012345678',
          name: 'Template 1',
          idGuild: '123456789012345678',
          idCategory: '123456789012345678'
        },
        { 
          idGuildTemplate: '123456789012345679',
          name: 'Template 2',
          idGuild: '123456789012345678',
          idCategory: '123456789012345678'
        }
      ];
      mockRepository.find.mockResolvedValue(templates);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['guild', 'category']
      });
      expect(result).toEqual(templates);
    });
  });

  describe('findOne', () => {
    it('should return a guild template by id', async () => {
      const template = { idGuildTemplate: '123456789012345678', name: 'Template 1' };
      const idGuildTemplate = '123456789012345678';
      mockRepository.findOne.mockResolvedValue(template);

      const result = await service.findOne(idGuildTemplate);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idGuildTemplate },
        relations: ['guild', 'category']
      });
      expect(result).toEqual(template);
    });
  });

  describe('update', () => {
    it('should update a guild template', async () => {
      const idGuildTemplate = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      
      // Créer un objet template existant avec la bonne structure
      const existingTemplate = { 
        idGuildTemplate: '123456789012345678',
        name: 'Test Template', 
        description: 'Test Description',
        idGuild: '123456789012345678',
        idCategory: '123456789012345678',
        configuration: {
          idWelcomeChannel: '123456789',
          prefix: '!',
          language: 'fr'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Réinitialiser les mocks
      vi.clearAllMocks();
      
      // Mock findOneBy pour retourner le template existant
      mockRepository.findOneBy.mockResolvedValue(existingTemplate);
      
      // Créer l'objet mis à jour attendu
      const updatedTemplate = {
        ...existingTemplate,
        name: 'Updated Template',
        updatedAt: new Date()
      };
      
      // Mock save pour retourner l'objet mis à jour
      mockRepository.save.mockResolvedValue(updatedTemplate);
      
      // Appeler la méthode update
      const result = await service.update(idGuildTemplate, updateDto);
      
      // Vérifier que le résultat n'est pas null
      expect(result).not.toBeNull();
      
      if (result) { // Type guard pour TypeScript
        // Vérifier que findOneBy a été appelé avec le bon id
        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ idGuildTemplate });
        
        // Vérifier que save a été appelé
        expect(mockRepository.save).toHaveBeenCalled();
        
        // Vérifier que le résultat contient les bonnes valeurs
        expect(result.name).toBe('Updated Template');
        expect(result.description).toBe('Test Description');
        expect(result.configuration.idWelcomeChannel).toBe('123456789');
        expect(result.updatedAt).toBeInstanceOf(Date);
        
        // Vérifier que les autres propriétés n'ont pas été modifiées
        expect(result.idGuildTemplate).toBe(existingTemplate.idGuildTemplate);
        expect(result.idGuild).toBe(existingTemplate.idGuild);
        expect(result.idCategory).toBe(existingTemplate.idCategory);
        expect(result.configuration.prefix).toBe(existingTemplate.configuration.prefix);
        expect(result.configuration.language).toBe(existingTemplate.configuration.language);
      }
    });

    it('should return null if template not found', async () => {
      const idGuildTemplate = '123456789012345678';
      const updateDto = { name: 'Updated Template' };
      
      // Réinitialiser les mocks
      vi.clearAllMocks();
      
      // Simuler le comportement du service
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.update(idGuildTemplate, updateDto);

      // Vérifier que findOneBy a été appelé avec le bon id
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ idGuildTemplate });
      
      // Vérifier que le résultat est null
      expect(result).toBeNull();
      
      // Vérifier que save n'a pas été appelé
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete a guild template', async () => {
      const idGuildTemplate = '123456789012345678';
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(idGuildTemplate);

      expect(mockRepository.delete).toHaveBeenCalledWith({ idGuildTemplate });
    });
  });
});
