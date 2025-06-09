import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class PickableDtoFields {
    @ApiProperty({
        description: 'Nom de la ressource',
        example: 'Idetaka',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50)
    name: string;

    @ApiProperty({
        description: 'Email de l\'utilisateur',
        example: 'user@example.com',
      })
      @IsString()
      @MaxLength(255)
    email: string;

    @ApiProperty({
        description: 'Prénom de l\'utilisateur',
        example: 'Jean',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50)
    firstName: string;

    @ApiProperty({
        description: 'Nom de famille de l\'utilisateur',
        example: 'Dupont',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50)
    lastName: string;
}