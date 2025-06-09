import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

import { Member } from "src/members/entities/member.entity";
import { IsEmail, IsString, IsUUID, Length, Matches, MaxLength } from "class-validator";

@Entity('identification_requests')
export class IdentificationRequest {
    
    @PrimaryGeneratedColumn('uuid', {
        name: 'id_identification_request',
    })
    @IsUUID()
    idIdentificationRequest: string;

    @Column({type: 'varchar', length: 50})
    @IsString()
    @Length(2, 50, { message: 'Le prénom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    firstName: string

    @Column({type: 'varchar', length: 50})
    @IsString()
    @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
    @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
    lastName: string

    @Column({type: 'varchar', length: 255})
    @IsEmail()
    @MaxLength(255)
    @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
    email: string

    @Column({ type: 'uuid', name: 'id_member' })
    @IsUUID()
    idMember: string;

    @OneToOne(() => Member, (member) => member.identificationRequest)
    @JoinColumn({ name: 'id_member' })
    member: Member

}
