import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle catégorie' })
  @ApiResponse({ status: 201, description: 'La catégorie a été créée avec succès.', type: Category })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories récupérée avec succès.', type: [Category] })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie par son id' })
  @ApiResponse({ status: 200, description: 'La catégorie a été trouvée.', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  findOne(@Param('id') idCategory: string) {
    return this.categoriesService.findOne(idCategory);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  @ApiResponse({ status: 200, description: 'La catégorie a été mise à jour avec succès.', type: Category })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  async update(@Param('id') idCategory: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.update(idCategory, updateCategoryDto);
    if (!category) {
      throw new NotFoundException(`Category with id "${idCategory}" not found`);
    }
    return category;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiResponse({ status: 200, description: 'La catégorie a été supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Catégorie non trouvée' })
  remove(@Param('id') idCategory: string) {
    return this.categoriesService.remove(idCategory);
  }
}
