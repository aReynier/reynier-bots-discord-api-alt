import { PickType, IntersectionType } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';

export class CreateIdentificationRequestDto extends PickType(IntersectionType(PickableInternIdFields, PickableDtoFields), [
    'idMember',
    'firstName',
    'lastName',
    'email'
]) {

}
