import { PickType } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';

export class CreateIdentificationRequestDto extends PickType(PickableInternIdFields, [
    'idMember'
]) {

  @IsString()
  @Length(2, 50)
  firstname: string;

  @IsString()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  email: string;

  idMember: string; 

}
