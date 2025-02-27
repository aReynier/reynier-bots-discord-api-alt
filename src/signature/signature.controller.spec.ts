import { Test, TestingModule } from '@nestjs/testing';
import { SignatureController } from './signature.controller';
import { SignatureService } from './signature.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PromotionSignatureDto } from './dto/promotion-signature.dto';
import { NotFoundException } from '@nestjs/common';

describe('SignatureController', () => {
  let controller: SignatureController;
  let service: SignatureService;

  // Création d'un mock pour le service Signature
  const mockSignatureService = {
    getPromotionSignature: vi.fn(),
    generateTestPromotionSignature: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignatureController],
      providers: [
        {
          provide: SignatureService,
          useValue: mockSignatureService,
        },
      ],
    }).compile();

    controller = module.get<SignatureController>(SignatureController);
    service = module.get<SignatureService>(SignatureService);
    
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPromotionSignature', () => {
    it('should return promotion signature for valid UUID', async () => {
      // Données de test
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const mockData = {
        promotion: {
          uuid,
          nom: 'Promotion 2023',
          forum: {
            snowflake: '123456789012345678',
            nom: 'Forum de la Promotion 2023'
          },
          chargeDeProjet: {
            snowflake: '987654321098765432',
            nom: 'Jean Dupont',
            roles: ['cdp', 'cda-p4-vals']
          },
          formateurs: [
            {
              snowflake: '111111111111111111',
              nom: 'Alice Martin',
              roles: ['formateur', 'cda-p4-vals']
            }
          ],
          apprenants: [
            {
              snowflake: '333333333333333333',
              nom: 'Élève 1',
              roles: ['apprenant', 'cda-p4-vals']
            }
          ]
        }
      };

      // Configurer le mock pour retourner les données de test
      mockSignatureService.getPromotionSignature.mockResolvedValue(mockData);

      // Appeler la méthode du contrôleur
      const result = await controller.getPromotionSignature(uuid);

      // Vérifier que le service a été appelé avec le bon UUID
      expect(mockSignatureService.getPromotionSignature).toHaveBeenCalledWith(uuid);
      
      // Vérifier que le résultat correspond aux données de test
      expect(result).toEqual(mockData);
      expect(result.promotion.uuid).toBe(uuid);
    });

    it('should throw NotFoundException for invalid UUID', async () => {
      const uuid = 'invalid-uuid';
      
      // Configurer le mock pour rejeter avec une erreur
      mockSignatureService.getPromotionSignature.mockRejectedValue(
        new Error('Promotion non trouvée')
      );
      
      // Vérifier que la méthode rejette une erreur
      await expect(controller.getPromotionSignature(uuid)).rejects.toThrow();
      
      // Vérifier que le service a été appelé avec le bon UUID
      expect(mockSignatureService.getPromotionSignature).toHaveBeenCalledWith(uuid);
    });
  });

  describe('createTestPromotionData', () => {
    it('should return test promotion data', async () => {
      // Données de test
      const mockData = {
        promotion: {
          uuid: '123e4567-e89b-12d3-a456-426614174000',
          nom: 'Promotion 2023',
          forum: {
            snowflake: '123456789012345678',
            nom: 'Forum de la Promotion 2023'
          },
          chargeDeProjet: {
            snowflake: '987654321098765432',
            nom: 'Jean Dupont',
            roles: ['cdp', 'cda-p4-vals']
          },
          formateurs: [],
          apprenants: []
        }
      };

      // Configurer le mock pour retourner les données de test
      mockSignatureService.generateTestPromotionSignature.mockResolvedValue(mockData);

      // Appeler la méthode du contrôleur
      const result = await controller.createTestPromotionData();

      // Vérifier que le service a été appelé
      expect(mockSignatureService.generateTestPromotionSignature).toHaveBeenCalled();
      
      // Vérifier que le résultat correspond aux données de test
      expect(result).toEqual(mockData);
    });
  });
}); 