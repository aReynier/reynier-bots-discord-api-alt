import { IsString, IsNotEmpty, IsBoolean, Length, Matches, IsOptional, MinLength } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PickableDiscordIdFields} from "src/utils/pickable-discord-id-fields";
import { PickableDtoFields } from "src/utils/pickable-dto-fields";

export class CreateCourseDto extends PickType(IntersectionType(PickableDiscordIdFields, PickableDtoFields), [
    'idCourse',
    'name', 
    'idGuild', 
    'idCategory'
]) {
    @ApiProperty({
        description: 'Nom de la formation',
        type: String,
        example: 'Développeur web',
    })
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'Si la formation est certifiante',
        type: String,
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    isCertified: boolean;

    @IsOptional()
    idRole: string;
}