import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class PickableInternIdFields {

  @ApiProperty({
    description: 'Identifiant unique du membre',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })  
  @IsUUID()
  idMember: string;

  @ApiProperty({
    description: 'Identifiant unique des informations du membre',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idMemberInfos: string;

  @ApiProperty({
    description: 'Identifiant unique du compte du dashboard',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idDashboardAccount: string;

  @ApiProperty({
    description: 'Identifiant unique de la demande d\'identification',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idIdentificationRequest: string;

  @ApiProperty({
    description: 'Identifiant unique du template de serveur',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idGuildTemplate: string;

  @ApiProperty({
    description: 'Identifiant unique de la ressource',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idResource: string;

  @ApiProperty({
    description: 'Identifiant unique du commentaire',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idComment: string;

  @ApiProperty({
    description: 'Identifiant unique de la transaction',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idXpTransaction: string;

  @ApiProperty({
    description: 'Identifiant unique du vote',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idVote: string;

  @ApiProperty({
    description: 'Identifiant unique du rapport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idReport: string;

  @ApiProperty({
    description: 'Identifiant unique du membre qui a fait le signalement',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idReporter: string;

  @ApiProperty({
    description: 'Identifiant unique du membre signalé',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idReportedMember: string;

  @ApiProperty({
    description: 'Identifiant unique de l\'action de modération',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idModerationAction: string;

  @ApiProperty({
    description: 'Identifiant unique de la question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idQuestion: string;

  @ApiProperty({
    description: 'Identifiant unique de la question',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idQuestionTemplate: string;

  @ApiProperty({
    description: 'Identifiant unique de la résponse',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idAnswer: string;

  @ApiProperty({
    description: 'Identifiant unique de la résponse',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idAnswerTemplate: string;

  @ApiProperty({
    description: 'Identifiant unique du sondage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idPoll: string;

  @ApiProperty({
    description: 'Identifiant unique du template du sondage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  idPollTemplate: string;

}