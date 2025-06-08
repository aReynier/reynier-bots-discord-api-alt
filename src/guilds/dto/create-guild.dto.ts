import { IsString, MaxLength, IsObject, Length } from 'class-validator';
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
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Nombre de membres dans le serveur',
    example: '100'
  })
  @IsString()
  @MaxLength(50)
  memberCount: string;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: { welcomeChannel: '123456789012345678', prefix: '!' },
    required: false
  })
  @IsObject()
  configuration?: Record<string, any>;
}
