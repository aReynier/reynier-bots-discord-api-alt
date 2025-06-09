import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength, Matches, IsEmail } from 'class-validator';

export class PickableDtoFields {
    @ApiProperty({
        description: 'Nom de la ressource',
        example: 'Idetaka',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(
        /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
        { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
    )
    name: string;

    @ApiProperty({
        description: 'Email de l\'utilisateur',
        example: 'user@example.com',
      })
      @IsEmail()
      @MaxLength(255)
      @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
    email: string;

    @ApiProperty({
        description: 'Prénom de l\'utilisateur',
        example: 'Jean',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50, { message: 'Le prénom/nom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom/nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    firstName: string;

    @ApiProperty({
        description: 'Nom de famille de l\'utilisateur',
        example: 'Dupont',
        maxLength: 50
    })
    @IsString()
    @Length(2, 50, { message: 'Le prénom/nom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom/nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    lastName: string;
}