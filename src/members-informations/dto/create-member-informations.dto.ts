import { IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
import { PickableDtoFields } from 'src/utils/pickable-dto-fields';

export class CreateMemberInformationsDto extends PickType(IntersectionType(PickableInternIdFields, PickableDtoFields), [
    'idMemberInfos',
    'idMember',
    'firstName',
    'lastName',
    'email'
]) {

}
