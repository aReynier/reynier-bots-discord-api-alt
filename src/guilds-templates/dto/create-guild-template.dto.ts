import { IsString, MaxLength, Length, IsOptional, IsJSON } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { IntersectionType } from '@nestjs/swagger';
import { PickableInternUUIDFields } from 'src/utils/pickable-intern-uuid-fields';

export class CreateGuildTemplateDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableInternUUIDFields), [
  'uuidGuildTemplate',
  'uuidGuild',
  'uuidCategory'
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
