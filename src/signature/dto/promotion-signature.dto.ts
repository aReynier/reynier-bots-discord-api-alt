import { ApiProperty } from '@nestjs/swagger';

export class ForumDto {
  @ApiProperty({ example: '123456789012345678' })
  snowflake: string;

  @ApiProperty({ example: 'Forum de la Promotion 2023' })
  nom: string;
}

export class MemberDto {
  @ApiProperty({ example: '987654321098765432' })
  snowflake: string;

  @ApiProperty({ example: 'Jean Dupont' })
  nom: string;

  @ApiProperty({ example: ['cdp', 'cda-p4-vals'] })
  roles: string[];
}

export class PromotionSignatureDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  uuid: string;

  @ApiProperty({ example: 'Promotion 2023' })
  nom: string;

  @ApiProperty()
  forum: ForumDto;

  @ApiProperty()
  chargeDeProjet: MemberDto;

  @ApiProperty({ type: [MemberDto] })
  formateurs: MemberDto[];

  @ApiProperty({ type: [MemberDto] })
  apprenants: MemberDto[];
} 