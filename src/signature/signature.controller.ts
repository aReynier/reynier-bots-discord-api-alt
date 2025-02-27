import { Controller, Get, Param, Post, HttpStatus } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromotionSignatureDto } from './dto/promotion-signature.dto';

@ApiTags('signature')
@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Get('promotion/:uuid')
  @ApiOperation({ summary: 'Récupérer la signature d\'une promotion par son UUID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Signature de la promotion récupérée avec succès',
    type: PromotionSignatureDto
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Promotion non trouvée'
  })
  async getPromotionSignature(@Param('uuid') uuid: string) {
    return this.signatureService.getPromotionSignature(uuid);
  }

  @Post('promotion/test')
  @ApiOperation({ summary: 'Créer des données de test pour une promotion' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Données de test générées avec succès',
    type: PromotionSignatureDto
  })
  async createTestPromotionData() {
    return this.signatureService.generateTestPromotionSignature();
  }
} 