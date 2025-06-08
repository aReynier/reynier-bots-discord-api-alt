import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, PickType, IntersectionType } from '@nestjs/swagger';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';

export class CreateDashboardAccountDto extends PickType(IntersectionType(PickableDiscordIdFields, PickableInternIdFields), [
    'idDashboardAccount',
    'idDiscord'
]) {
    @ApiProperty({
        description: 'Email associé au compte du dashboard',
        type: String,
        example: 'test@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Mot de passe associé au compte du dashboard',
        type: String,
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}