import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpStatus } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { Promotion } from './entities/promotion.entity';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(
    private readonly promotionsService: PromotionsService
    ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Créer une promotion',
    description: 'Crée une promotion avec un rôle associé et l\'enregistre en base de données.'
  })
  @ApiBody({ type: CreatePromotionDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'La promotion a été créée avec succès.',
    type: Promotion 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides fournies dans la requête.' 
  })
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionsService.create(createPromotionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les promotions' })
  @ApiResponse({ status: 200, description: 'Liste des promotions récupérée avec succès.', type: [Promotion] })
  findAll() {
    return this.promotionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une promotion par son id' })
  @ApiResponse({ status: 200, description: 'Promotion récupérée avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  findOne(@Param('id') idPromotion: string) {
    return this.promotionsService.findOne(idPromotion);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une promotion' })
  @ApiResponse({ status: 200, description: 'La promotion a été mise à jour avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  async update(@Param('id') idPromotion: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.promotionsService.update(idPromotion, updatePromotionDto);
    if (!promotion) {
      throw new NotFoundException(`Promotion with id "${idPromotion}" not found`);
    }
    return promotion;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une promotion' })
  @ApiResponse({ status: 200, description: 'La promotion a été supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Promotion non trouvée' })
  remove(@Param('id') idPromotion: string) {
    return this.promotionsService.remove(idPromotion);
  }

  @Post(':id/followers/:idMember')
  @ApiOperation({ summary: 'Ajouter un membre comme follower d\'une promotion' })
  @ApiParam({ name: 'id_promotion', description: 'id de la promotion' })
  @ApiParam({ name: 'id_member', description: 'id du membre à ajouter comme follower' })
  @ApiResponse({ status: 200, description: 'Le membre a été ajouté comme follower avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion ou membre non trouvé' })
  @ApiResponse({ status: 400, description: 'Le membre est déjà follower de cette promotion' })
  addFollower(
    @Param('id') idPromotion: string,
    @Param('idMember') idMember: string,
  ) {
    return this.promotionsService.addFollower(idPromotion, idMember);
  }

  @Post(':id/managers/:idMember')
  @ApiOperation({ summary: 'Ajouter un membre comme manager d\'une promotion' })
  @ApiParam({ name: 'id', description: 'id de la promotion' })
  @ApiParam({ name: 'idMember', description: 'id du membre à ajouter comme manager' })
  @ApiResponse({ status: 200, description: 'Le membre a été ajouté comme manager avec succès.', type: Promotion })
  @ApiResponse({ status: 404, description: 'Promotion ou membre non trouvé' })
  @ApiResponse({ status: 400, description: 'Le membre est déjà manager de cette promotion' })
  addManager(
    @Param('id') idPromotion: string,
    @Param('idMember') idMember: string,
  ) {
    return this.promotionsService.addManager(idPromotion, idMember);
  }
} 