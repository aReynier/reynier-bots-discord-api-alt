import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AssignRoleToMemberDto } from '../roles/dto/assign-role-to-member.dto';
import { UpdateMemberRolesDto } from '../roles/dto/update-member-roles.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Member } from './entities/member.entity';
import { Role } from '../roles/entities/role.entity';
import { Promotion } from '../promotions/entities/promotion.entity';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un nouveau membre',
    description:
      'Crée un nouveau membre dans la base de données avec les informations fournies.',
  })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le membre a été créé avec succès.',
    type: Member,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides fournies dans la requête.',
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les membres',
    description:
      'Retourne la liste de tous les membres enregistrés dans la base de données.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste de tous les membres récupérée avec succès.',
    type: [Member],
  })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer un membre par son id',
    description:
      'Recherche et retourne un membre spécifique en utilisant son id.',
  })
  @ApiParam({
    name: 'id',
    description: 'id unique du membre à rechercher',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le membre a été trouvé et récupéré avec succès.',
    type: Member,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Aucun membre trouvé avec l'id fourni.",
  })
  findOne(@Param('id') idMember: string) {
    return this.membersService.findOne(idMember);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Mettre à jour un membre',
    description:
      "Met à jour les informations d'un membre existant en utilisant son id.",
  })
  @ApiParam({
    name: 'id',
    description: 'id unique du membre à mettre à jour',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le membre a été mis à jour avec succès.',
    type: Member,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides fournies dans la requête.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Aucun membre trouvé avec l'id fourni.",
  })
  update(
    @Param('id') idMember: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(idMember, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer un membre',
    description:
      'Supprime un membre existant de la base de données en utilisant son id.',
  })
  @ApiParam({
    name: 'id',
    description: 'id unique du membre à supprimer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le membre a été supprimé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Aucun membre trouvé avec l'id fourni.",
  })
  remove(@Param('id') idMember: string) {
    return this.membersService.remove(idMember);
  }

  @Get(':id/roles')
  @ApiOperation({ summary: 'Récupérer tous les rôles liés à un membre' })
  @ApiParam({ name: 'idMember', description: 'id du membre' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des rôles du membre',
    type: [Role],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membre non trouvé',
  })
  getMemberRoles(@Param('id') idMember: string) {
    return this.membersService.getMemberRoles(idMember);
  }

  @Put(':id/assign-role/:idRole')
  @ApiOperation({ summary: 'Assigner un rôle unique à un membre' })
  @ApiParam({ name: 'idMember', description: 'id du membre' })
  @ApiParam({ name: 'idRole', description: 'id du rôle à assigner' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rôle assigné avec succès',
    type: Member,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Le membre possède déjà ce rôle',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membre ou rôle non trouvé',
  })
  assignRole(
    @Param('id') idMember: string,
    @Param('idRole') idRole: string,
  ) {
    return this.membersService.assignRoleToMember(idRole, idRole);
  }

  @Delete(':id/roles/:idRole')
  @ApiOperation({
    summary: "Supprimer un rôle d'un membre",
    description:
      "Supprime un rôle spécifique d'un membre, sans affecter les autres rôles.",
  })
  @ApiParam({
    name: 'id',
    description: 'id du membre',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'idRole',
    description: 'id du rôle à supprimer',
    example: '172653890987364567',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le rôle a été supprimé du membre avec succès.',
    type: Member,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membre ou rôle non trouvé.',
  })
  removeRoleFromMember(
    @Param('id') idMember: string,
    @Param('idRole') idRole: string,
  ) {
    return this.membersService.removeRoleFromMember(idMember, idRole);
  }

  @Get(':id/promotions')
  @ApiOperation({
    summary: 'Récupérer les promotions suivies et gérées par un membre',
    description:
      'Retourne les promotions suivies et gérées par un membre spécifique en utilisant son id.',
  })
  @ApiParam({
    name: 'id',
    description: 'id unique du membre à rechercher',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Les promotions du membre ont été récupérées avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Aucun membre trouvé avec l'id fourni.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de la récupération des promotions du membre.",
  })
  findMemberPromotions(@Param('id') id: string) {
    return this.membersService.findMemberPromotions(id);
  }
}
