import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un nouveau cours',
    description:
      'Crée un nouveau cours dans la base de données et génère automatiquement un rôle associé.',
  })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le cours a été créé avec succès.',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides fournies dans la requête.',
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({
      summary: 'Récupérer toutes les formations',
      description: 'Retourne la liste complète des formations avec leurs relations'
  })
  @ApiResponse({
      status: HttpStatus.OK,
      description: 'Liste des formations récupérée avec succès',
      type: [Course]
  })
  @ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Erreur lors de la récupération des formations'
  })
  async findAll(): Promise<Course[]> {
      return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer une formation par son id',
    description: "Retourne les détails d'une formation spécifique",
  })
  @ApiParam({
    name: 'id',
    description: 'id de la formation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La formation a été trouvée.',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Formation non trouvée.',
  })
  async getById(@Param('id') idCourse: string): Promise<Course> {
    return this.coursesService.getById(idCourse);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Mettre à jour une formation',
    description: "Met à jour les informations d'une formation existante",
  })
  @ApiParam({
    name: 'id',
    description: 'id de la formation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La formation a été mise à jour avec succès.',
    type: Course,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides fournies.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Formation non trouvée.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Le nouveau nom est déjà utilisé par une autre formation.',
  })
  async updateById(
    @Param('id') idCourse: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.updateById(idCourse, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer une formation',
    description: 'Supprime une formation existante',
  })
  @ApiParam({
    name: 'id',
    description: 'id de la formation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'La formation a été supprimée avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Formation non trouvée.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erreur lors de la suppression de la formation.',
  })
    async deleteById(@Param('id') idCourse: string): Promise<void> {
    return this.coursesService.deleteById(idCourse);
  }
}
