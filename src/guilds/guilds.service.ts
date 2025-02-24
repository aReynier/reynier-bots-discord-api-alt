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
    private guildRepository: Repository<Guild>,
  ) {}

  // Créer une nouvelle guild
  create(createGuildDto: CreateGuildDto) {
    const guild = this.guildRepository.create(createGuildDto);
    return this.guildRepository.save(guild);
  }

  // Récupérer toutes les guilds
  findAll() {
    return this.guildRepository.find();
  }

  // Récupérer une guild par son uuid
  async findOne(uuidGuild: string): Promise<Guild> {
    const guild = await this.guildRepository.findOneBy({ uuidGuild });
    if (!guild) {
      throw new NotFoundException(`Guild with UUID "${uuidGuild}" not found`);
    }
    return guild;
  }

  // Mettre à jour une guild
  async update(uuidGuild: string, updateGuildDto: UpdateGuildDto): Promise<Guild> {
    // Cherche la guild
    const guild = await this.guildRepository.findOneBy({ uuidGuild });
    if (!guild) {
      throw new NotFoundException(`Guild with UUID "${uuidGuild}" not found`);
    }
    
    // Mise à jour des champs autorisés uniquement
    const { name, memberCount, configuration } = updateGuildDto;
    if (name !== undefined) guild.name = name;
    if (memberCount !== undefined) guild.memberCount = memberCount;
    if (configuration !== undefined) guild.configuration = configuration;
    
    guild.updatedAt = new Date();
    return this.guildRepository.save(guild);
  }

  // Supprimer une guild
  async remove(uuidGuild: string): Promise<void> {
    const result = await this.guildRepository.delete({ uuidGuild });
    if (result.affected === 0) {
      throw new NotFoundException(`Guild with UUID "${uuidGuild}" not found`);
    }
  }
}
