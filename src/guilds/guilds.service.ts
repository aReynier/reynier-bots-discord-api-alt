import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { Guild } from './entities/guild.entity';

@Injectable()
export class GuildsService {
  constructor(
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
  ) {}

  // Créer une nouvelle guild
  async create(createGuildDto: CreateGuildDto): Promise<Guild> {
    const guild = this.guildRepository.create(createGuildDto);
    return await this.guildRepository.save(guild);
  }

  // Récupérer toutes les guilds
  async findAll(): Promise<Guild[]> {
    return await this.guildRepository.find({
      relations: ['courses', 'members', 'roles', 'channels', 'categories', 'campuses', 'promotions', 'template']
    });
  }

  // Récupérer une guild par son sf
  async findOne(idGuild: string): Promise<Guild> {
    const guild = await this.guildRepository.findOne({
      where: { idGuild },
      relations: ['courses', 'members', 'roles', 'channels', 'categories', 'campuses', 'promotions', 'template']
    });

    if (!guild) {
      throw new NotFoundException(`Guild with id "${idGuild}" not found`);
    }

    return guild;
  }

  // Mettre à jour une guild
  async update(idGuild: string, updateGuildDto: UpdateGuildDto): Promise<Guild> {
    const guild = await this.findOne(idGuild);
    
    // Mise à jour des propriétés simples
    Object.assign(guild, updateGuildDto);
    
    return await this.guildRepository.save(guild);
  }

  // Supprimer une guild
  async remove(idGuild: string): Promise<void> {
    const result = await this.guildRepository.delete({ idGuild });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Guild with id "${idGuild}" not found`);
    }
  }
}
