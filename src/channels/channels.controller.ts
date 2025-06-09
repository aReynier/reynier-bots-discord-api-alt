import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Channel } from './entities/channel.entity';

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau channel' })
  @ApiResponse({ status: 201, description: 'Le channel a été créé avec succès.', type: Channel })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les channels' })
  @ApiResponse({ status: 200, description: 'Liste des channels récupérée avec succès.', type: [Channel] })
  findAll() {
    return this.channelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un channel par son id' })
  @ApiParam({ name: 'id', description: 'id du channel' })
  @ApiResponse({ status: 200, description: 'Le channel a été trouvé.', type: Channel })
  @ApiResponse({ status: 404, description: 'Channel non trouvé' })
  findOne(@Param('id') idChannel: string) {
    return this.channelService.findOne(idChannel);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un channel' })
  @ApiParam({ name: 'id', description: 'id du channel' })
  @ApiResponse({ status: 200, description: 'Le channel a été mis à jour.', type: Channel })
  @ApiResponse({ status: 404, description: 'Channel non trouvé' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  async update(@Param('id') idChannel: string, @Body() updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelService.update(idChannel, updateChannelDto);
    if (!channel) {
      throw new NotFoundException(`Channel with id "${idChannel}" not found`);
    }
    return channel;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un channel' })
  @ApiParam({ name: 'id', description: 'id du channel' })
  @ApiResponse({ status: 200, description: 'Le channel a été supprimé.' })
  @ApiResponse({ status: 404, description: 'Channel non trouvé' })
  remove(@Param('id') idChannel: string) {
    return this.channelService.remove(idChannel);
  }
} 