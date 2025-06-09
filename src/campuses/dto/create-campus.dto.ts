import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateCampusDto extends PickType(IntersectionType(PickableDtoFields, PickableDiscordIdFields), [
  'idCampus',
  'name',
  'idRole',
  'idGuild',
  'idCategory'
]) { 
  @ApiProperty({
    description: 'Emplacement du campus',
    example: 'Lille',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({
    description: 'ID Discord de la catégorie associée',
    example: '123456789012345678'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{17,19}$/)
  idCategory: string;
}
