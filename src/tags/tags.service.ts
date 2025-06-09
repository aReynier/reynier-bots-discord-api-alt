import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      const tag = this.tagRepository.create(createTagDto);
      return await this.tagRepository.save(tag);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Un tag avec ce nom existe déjà');
      }
      throw error;
    }
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { idTag: id } });
    if (!tag) {
      throw new NotFoundException(`Tag avec l'ID ${id} non trouvé`);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      const tag = await this.findOne(id);
      Object.assign(tag, updateTagDto);
      return await this.tagRepository.save(tag);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Un tag avec ce nom existe déjà');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.tagRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tag avec l'ID ${id} non trouvé`);
    }
  }
}
