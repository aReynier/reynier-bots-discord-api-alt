import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { MembersInformationsService } from './members-informations.service';
import { CreateMemberInformationsDto } from './dto/create-member-informations.dto';
import { UpdateMemberInformationsDto } from './dto/update-member-informations.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MemberInformation } from './entities/member-information.entity';

@ApiTags('members-informations')
@Controller('members-informations')
export class MembersInformationsController {
  constructor(private readonly membersInformationsService: MembersInformationsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer des informations pour un membre' })
  @ApiResponse({ status: 201, description: 'Les informations ont été créées avec succès.', type: MemberInformation })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createMemberInformationDto: CreateMemberInformationsDto) {
    return this.membersInformationsService.create(createMemberInformationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer les informations de tous les membres' })
  @ApiResponse({ status: 200, description: 'Liste des informations récupérée avec succès.', type: [MemberInformation] })
  findAll() {
    return this.membersInformationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer les informations d\'un membre par son id' })
  @ApiResponse({ status: 200, description: 'Les informations ont été trouvées.', type: MemberInformation })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  findOne(@Param('id') idMemberInfos: string) {
    return this.membersInformationsService.findOne(idMemberInfos);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour les informations d\'un membre' })
  @ApiResponse({ status: 200, description: 'Les informations ont été mises à jour avec succès.', type: MemberInformation })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  async update(@Param('id') idMemberInfos: string, @Body() updateMemberInformationsDto: UpdateMemberInformationsDto) {
    const memberInformations = await this.membersInformationsService.update(idMemberInfos, updateMemberInformationsDto);
    if (!memberInformations) {
      throw new NotFoundException(`MemberInformations with id "${idMemberInfos}" not found`);
    }
    return memberInformations;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer les informations d\'un membre' })
  @ApiResponse({ status: 200, description: 'Les informations ont été supprimées avec succès.' })
  @ApiResponse({ status: 404, description: 'Informations non trouvées' })
  remove(@Param('id') idMemberInfos: string) {
    return this.membersInformationsService.remove(idMemberInfos);
  }
}
