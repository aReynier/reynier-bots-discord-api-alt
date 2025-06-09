import { PickType, ApiProperty } from "@nestjs/swagger";

import { PickableInternIdFields } from "src/utils/pickable-intern-id-fields";

import { ArrayNotEmpty, ArrayUnique, IsString, Matches } from "class-validator";

export class AssignRoleToMemberDto extends PickType(PickableInternIdFields, [
    'idMember',
]) {

    @ApiProperty({
        description: "Liste des id des rôles à attribuer au membre",
        example: ["12345678901234567", "123456789012345678", "1234567890123456789"]
    })
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({ each: true }) // Assure que chaque élément est une chaîne
    @Matches(/^\d{17,19}$/, { each: true, message: "Chaque idRole doit être un Snowflake Discord valide (17 à 19 chiffres uniquement)" })
    idRoles: string[];
}
