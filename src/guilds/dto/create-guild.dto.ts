import { IsString, MaxLength, IsObject, Length, Matches } from 'class-validator';
import { ApiProperty,PickType } from '@nestjs/swagger';
import { PickableDiscordIdFields } from 'src/utils/pickable-discord-id-fields';

export class CreateGuildDto extends PickType(PickableDiscordIdFields, [
  'idGuild'
]) {
  @ApiProperty({
    description: 'Nom du serveur',
    example: 'Simplon Server'
  })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Nombre de membres',
    example: "100"
  })
  @IsString()
  @Matches(/^\d+$/, { message: 'memberCount doit être une chaîne numérique' })
  memberCount: string;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: { welcomeChannel: '123456789012345678', prefix: '!' },
    required: false
  })
  @IsObject()
  configuration?: Record<string, any>;
}
