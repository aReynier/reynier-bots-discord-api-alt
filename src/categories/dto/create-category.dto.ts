import { IsString, IsInt, Min, Length, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PickableDiscordIdFields} from 'src/utils/pickable-discord-id-fields';

export class CreateCategoryDto extends PickType(PickableDiscordIdFields, [
    'idCategory',
    'idGuild'
]) {
    @ApiProperty({
        description: 'Nom de la catégorie',
        example: 'Général'
    })
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(
        /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
        { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
    )
    name: string;

    @ApiProperty({
        description: 'Position de la catégorie dans le serveur',
        example: 0
    })
    @IsInt()
    @Min(0)
    categoryPosition: number;
}
