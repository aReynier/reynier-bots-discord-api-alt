import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find({
      relations: {
        guild: true,
        channels: true,
        course: true,
        promotion: true,
        guildTemplate: true
      }
    });
  }

  findOne(idCategory: string) {
    return this.categoryRepository.findOne({
      where: { idCategory },
      relations: {
        guild: true,
        channels: true,
        course: true,
        promotion: true,
        guildTemplate: true
      }
    });
  }

  async update(idCategory: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ idCategory });
    if (!category) {
      return null;
    }
    
    // Mise à jour des champs autorisés uniquement
    const { name, position, idGuildTemplate } = updateCategoryDto;
    if (name !== undefined) category.name = name;
    if (position !== undefined) category.position = position;
    if (idGuildTemplate !== undefined) category.idGuildTemplate = idGuildTemplate;
    
    category.updatedAt = new Date();
    return this.categoryRepository.save(category);
  }

  remove(idCategory: string) {
    return this.categoryRepository.delete({ idCategory });
  }
}
