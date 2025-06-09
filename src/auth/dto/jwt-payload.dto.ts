import { ApiProperty } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';

export class JwtPayloadDto {
  @ApiProperty({
    description: 'ID unique de l\'utilisateur Discord (subject)',
    example: '123456789012345678'
  })
  idUser: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur Discord',
    example: 'discord_user'
  })
  username: string;

  @ApiProperty({
    description: 'Rôles de l\'utilisateur dans la guilde',
    example: ['member', 'moderator']
  })
  idRoles: string[];

  @ApiProperty({
    description: 'ID de la guilde Discord autorisée',
    example: '123456789012345678'
  })
  guildId: string;
}

export class CreateAnswerDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  idQuestion: string;
}

export class CreateAnswerTemplateDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  idQuestionTemplate: string;
}

export interface DiscordUser {
  idUser: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
  verified?: boolean;
}

export interface DiscordGuild {
  idGuild: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
}

export interface DiscordGuildMember {
  user: DiscordUser;
  nick: string | null;
  idRoles: string[];
  joined_at: string;
  deaf: boolean;
  mute: boolean;
}

export interface JwtPayload {
  idUser: string;
  username: string;
  idRoles: string[];
}

export const Roles = (...idRoles: string[]) => SetMetadata('roles', idRoles); 