import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordUUIDFields } from 'src/utils/pickable-discord-uuid-fields';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateCampusDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordUUIDFields), [
  'uuidCampus',
  'name',
  'uuidRole',
  'uuidGuild'
]) { 
  @ApiProperty({
    description: 'Emplacement du campus',
    example: 'Lille',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
