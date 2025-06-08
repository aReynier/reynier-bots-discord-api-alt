import { IsString, IsNotEmpty, IsBoolean, Length, Matches, IsOptional, MinLength } from "class-validator";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PickableDiscordUUIDFields } from "src/utils/pickable-discord-uuid-fields";
import { PickableDtoFields } from "src/utils/pickable-dto-fields";

export class CreateCourseDto extends PickType(IntersectionType(PickableDiscordUUIDFields, PickableDtoFields), [
    'uuidCourse',
    'name', 
    'uuidGuild', 
    'uuidCategory'
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
    uuidRole: string;
}