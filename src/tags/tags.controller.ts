import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau tag' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Tag créé avec succès',
    type: Tag,
    content: {
      'application/json': {
        example: {
          idTag: '550e8400-e29b-41d4-a716-446655440000',
          name: 'JavaScript',
          description: 'Langage de programmation pour le web',
          createdAt: '2024-03-14T12:00:00Z',
          updatedAt: '2024-03-14T12:00:00Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: ['Le nom du tag doit contenir entre 2 et 50 caractères'],
          error: 'Bad Request'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Tag déjà existant',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          message: 'Un tag avec ce nom existe déjà',
          error: 'Conflict'
        }
      }
    }
  })
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les tags' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Liste des tags récupérée avec succès', 
    type: [Tag],
    content: {
      'application/json': {
        example: [{
          idTag: '550e8400-e29b-41d4-a716-446655440000',
          name: 'JavaScript',
          description: 'Langage de programmation pour le web',
          createdAt: '2024-03-14T12:00:00Z',
          updatedAt: '2024-03-14T12:00:00Z'
        }, {
          idTag: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Python',
          description: 'Langage de programmation polyvalent',
          createdAt: '2024-03-14T12:00:00Z',
          updatedAt: '2024-03-14T12:00:00Z'
        }]
      }
    }
  })
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un tag par son ID' })
  @ApiParam({ name: 'id', description: 'id du tag', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Tag récupéré avec succès', 
    type: Tag,
    content: {
      'application/json': {
        example: {
          idTag: '550e8400-e29b-41d4-a716-446655440000',
          name: 'JavaScript',
          description: 'Langage de programmation pour le web',
          createdAt: '2024-03-14T12:00:00Z',
          updatedAt: '2024-03-14T12:00:00Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Tag non trouvé',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Tag avec l\'ID 550e8400-e29b-41d4-a716-446655440000 non trouvé',
          error: 'Not Found'
        }
      }
    }
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un tag' })
  @ApiParam({ name: 'id', description: 'id du tag', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Tag mis à jour avec succès', 
    type: Tag,
    content: {
      'application/json': {
        example: {
          idTag: '550e8400-e29b-41d4-a716-446655440000',
          name: 'JavaScript ES2022',
          description: 'Dernière version du langage JavaScript',
          createdAt: '2024-03-14T12:00:00Z',
          updatedAt: '2024-03-14T12:30:00Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Tag non trouvé',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Tag avec l\'ID 550e8400-e29b-41d4-a716-446655440000 non trouvé',
          error: 'Not Found'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Données invalides',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          message: ['Le nom du tag doit contenir entre 2 et 50 caractères'],
          error: 'Bad Request'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'Tag déjà existant',
    content: {
      'application/json': {
        example: {
          statusCode: 409,
          message: 'Un tag avec ce nom existe déjà',
          error: 'Conflict'
        }
      }
    }
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un tag' })
  @ApiParam({ name: 'id', description: 'id du tag', type: 'string' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Tag supprimé avec succès',
    content: {
      'application/json': {
        example: {
          statusCode: 200,
          message: 'Tag supprimé avec succès'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Tag non trouvé',
    content: {
      'application/json': {
        example: {
          statusCode: 404,
          message: 'Tag avec l\'ID 550e8400-e29b-41d4-a716-446655440000 non trouvé',
          error: 'Not Found'
        }
      }
    }
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tagsService.remove(id);
  }
}
