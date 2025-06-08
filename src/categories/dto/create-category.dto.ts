import { IsString, IsInt, MaxLength, Min, Length } from 'class-validator';
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
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Position de la catégorie dans le serveur',
        example: 0
    })
    @IsInt()
    @Min(0)
    position: number;
}
