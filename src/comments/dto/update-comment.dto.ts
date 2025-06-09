import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsString, IsOptional, Length, IsIn, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO pour la mise à jour d'un commentaire
 * 
 * Hérite de CreateCommentDto avec toutes les propriétés optionnelles
 * pour permettre des mises à jour partielles.
 */
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiPropertyOptional({
    description: 'Nouveau contenu du commentaire',
    example: 'Contenu mis à jour',
    minLength: 1,
    maxLength: 1000
  })
  @IsOptional()
  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  @Length(1, 1000, { 
    message: 'Le contenu doit contenir entre $constraint1 et $constraint2 caractères'
  })
  @Transform(({ value }) => value?.trim())
  content?: string;

  @ApiPropertyOptional({
    description: 'Nouveau statut du commentaire',
    example: 'inactive',
    enum: ['active', 'inactive', 'deleted']
  })
  @IsOptional()
  @IsString({ message: 'Le statut doit être une chaîne de caractères' })
  @IsIn(['active', 'inactive', 'deleted'], { 
    message: 'Le statut doit être soit active, inactive ou deleted'
  })
  comment_status?: string;

  /**
   * Nouvel ID de la ressource
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de la ressource doit être un UUID valide' })
  idResource?: string;

  /**
   * Nouvel ID de l'utilisateur propriétaire
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @IsOptional()
  @IsUUID('4', { message: 'L\'ID de l\'utilisateur propriétaire doit être un UUID valide' })
  idUser?: string;
}
