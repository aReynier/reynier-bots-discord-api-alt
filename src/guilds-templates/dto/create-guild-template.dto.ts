import { IsString, MaxLength, Length, IsOptional, IsJSON } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { IntersectionType } from '@nestjs/swagger';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';

export class CreateGuildTemplateDto extends PickType(IntersectionType(PickableDiscordIdFields, PickableInternIdFields), [
  'idGuildTemplate',
  'idGuild',
  'idCategory'
]) {
  @ApiProperty({
    description: 'Nom du template',
    example: 'Template Simplon'
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Description du template',
    example: 'Template pour les serveurs Simplon',
    required: false
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Configuration du template',
    example: {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur', 'apprenant'],
      permissions: { default: ['READ_MESSAGES'] }
    },
    required: false
  })
  @IsJSON()
  @IsOptional()
  configuration?: Record<string, any>;
}
