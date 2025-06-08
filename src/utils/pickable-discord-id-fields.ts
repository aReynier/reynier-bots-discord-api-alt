import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class PickableDiscordIdFields {

  @ApiProperty({
    description: 'Identifiant unique du compte discord du membre (Snowflake)',
    minLength: 17,
    maxLength: 19,
    default: 'discord_user_id',
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idDiscord: string;

  @ApiProperty({
    description: 'Identifiant unique du serveur (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '123456789012345678',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idGuild: string;

  @ApiProperty({
    description: 'Identifiant unique de category (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '123456789012345678',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idCategory: string;

  @ApiProperty({
    description: 'Identifiant unique de channel (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idChannel: string;

  @ApiProperty({
    description: 'Identifiant unique de rôle (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idRole: string;

  @ApiProperty({
    description: 'Identifiant unique du tag (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idTag: string;

  @ApiProperty({
    description: 'Identifiant unique de la formation (Snowflake)',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idCourse: string;

  @ApiProperty({
    description: 'Identifiant unique du campus',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idCampus: string;

  @ApiProperty({
    description: 'Identifiant unique de la promotion',
    minLength: 17,
    maxLength: 19,
    example: '726798891974243359',
  })
  @IsString()
  @Matches(/^\d+$/)
  @Length(17, 19)
  idPromotion: string;
}