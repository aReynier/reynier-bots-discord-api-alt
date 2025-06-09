import { IsString, MaxLength, IsInt, Min, Matches, IsIn, IsUUID, Length } from 'class-validator';
import { ApiProperty, PickType, IntersectionType } from '@nestjs/swagger';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
 
export class CreateMemberDto extends PickType(IntersectionType(PickableInternIdFields, PickableDiscordIdFields), [
  'idMember',
  'idDiscord',
  'idGuild'
]) {     
  @ApiProperty({
    description: 'Nom d\'utilisateur du membre dans la guilde',
    example: 'JohnDoe',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  guildUsername: string;

  @ApiProperty({
    description: 'Points d\'expérience du membre',
    example: '100.00'
  })
  @IsString()
  @Matches(/^\d+\.\d{2}$/, { message: 'xp doit être un nombre décimal avec 2 décimales (ex: 100.00)' })
  xp: string;

  @ApiProperty({
    description: 'Niveau du membre',
    example: 1,
    minimum: 0
  })
  @IsInt()
  @Min(0)
  level: number;

  @ApiProperty({
    description: 'Rôle communautaire du membre',
    example: 'Member',
    maxLength: 50
  })
  @IsString()
  @MaxLength(50)
  communityRole: string;

  @ApiProperty({
    description: 'Statut du membre',
    example: 'Active',
    enum: ['Active', 'Inactive', 'Banned']
  })
  @IsString()
  @Length(1, 50, { message: 'Le statut doit contenir entre 1 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le statut ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  @IsIn(['Active', 'Inactive', 'Banned'])
  status: string;

  @IsUUID()
  idGuild: string;

  @IsUUID()
  idDiscord: string;
}
