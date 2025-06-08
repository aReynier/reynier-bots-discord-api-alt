import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateCampusDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordIdFields), [
  'idCampus',
  'name',
  'idRole',
  'idGuild'
]) { 
  @ApiProperty({
    description: 'Emplacement du campus',
    example: 'Lille',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
