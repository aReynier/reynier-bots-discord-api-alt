import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';

export class CreatePromotionDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordIdFields, PickableInternIdFields), [
  'idPromotion',
  'name',
  'idRole',
  'idGuild',
  'idCourse',
  'idCampus',
  'idCategory'
]) {
  @ApiProperty({
    description: 'Date de début de la promotion',
    example: '2024-01-01T00:00:00.000Z'
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59.999Z'
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
} 