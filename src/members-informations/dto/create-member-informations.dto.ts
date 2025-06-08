import { IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';

export class CreateMemberInformationsDto extends PickType(PickableInternIdFields, [
    'idMemberInfos',
    'idMember'
]) {

    @ApiProperty({
        description: 'Prénom du membre',
        example: 'Jean'
    })
    @IsString()
    @MaxLength(50)
    firstName: string;

    @ApiProperty({
        description: 'Nom de famille du membre',
        example: 'Dupont'
    })
    @IsString()
    @MaxLength(50)
    lastName: string;

    @ApiProperty({
        description: 'Adresse email du membre',
        example: 'jean.dupont@example.com'
    })
    @IsEmail()
    @MaxLength(100)
    email: string;
}
