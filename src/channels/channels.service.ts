import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
  ) {}

  create(createChannelDto: CreateChannelDto) {
    const channel = this.channelRepository.create(createChannelDto);
    return this.channelRepository.save(channel);
  }

  findAll() {
    return this.channelRepository.find({
      relations: ['guild', 'category']
    });
  }

  findOne(idChannel: string) {
    return this.channelRepository.findOne({
      where: { idChannel },
      relations: ['guild', 'category']
    });
  }

  async update(idChannel: string, updateChannelDto: UpdateChannelDto) {
    const channel = await this.channelRepository.findOneBy({ idChannel });
    if (!channel) {
      return null;
    }
    
    // Mise à jour des champs autorisés uniquement
    const { name, type, channelPosition, idCategory } = updateChannelDto;
    if (name !== undefined) channel.name = name;
    if (type !== undefined) channel.type = type;
    if (channelPosition !== undefined) channel.channelPosition = channelPosition;
    if (idCategory !== undefined) channel.idCategory = idCategory;
    
    channel.updatedAt = new Date();
    return this.channelRepository.save(channel);
  }

  remove(idChannel: string) {
    return this.channelRepository.delete({ idChannel });
  }
} 