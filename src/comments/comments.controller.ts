import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouveau commentaire' })
  @ApiResponse({ status: 201, type: Comment })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Récupérer tous les commentaires' })
  @ApiResponse({ status: 200, type: [Comment] })
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Récupérer un commentaire par id' })
  @ApiParam({ name: 'id', description: 'id du commentaire' })
  @ApiResponse({ status: 200, type: Comment })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  findOne(@Param('id', ParseUUIDPipe) idComment: string): Promise<Comment> {
    return this.commentsService.findOne(idComment);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mettre à jour un commentaire' })
  @ApiParam({ name: 'id', description: 'id du commentaire' })
  @ApiResponse({ status: 200, type: Comment })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  update(
    @Param('id', ParseUUIDPipe) idComment: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<Comment> {
    return this.commentsService.update(idComment, updateCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un commentaire' })
  @ApiParam({ name: 'id', description: 'id du commentaire' })
  @ApiResponse({ status: 204, description: 'Supprimé' })
  @ApiResponse({ status: 404, description: 'Non trouvé' })
  remove(@Param('id', ParseUUIDPipe) idComment: string): Promise<void> {
    return this.commentsService.remove(idComment);
  }
}
