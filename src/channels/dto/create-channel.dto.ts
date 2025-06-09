import { IsString, IsInt, IsEnum, MaxLength, Min, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';

enum ChannelType {
  TEXT = 'text',
  VOICE = 'voice',
  ANNOUNCEMENT = 'announcement'
}

export class CreateChannelDto extends PickType(PickableDiscordIdFields, [
  'idChannel',
  'idGuild',
  'idCategory'
]) {
  @ApiProperty({
    description: 'Le nom du channel',
    example: 'général',
    maxLength: 100
  })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Le type de channel',
    example: 'text',
    enum: ChannelType
  })
  @IsString()
  @IsEnum(ChannelType)
  type: string;

  @ApiProperty({
    description: 'La position du channel',
    example: 1,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  channelPosition: number;
} 