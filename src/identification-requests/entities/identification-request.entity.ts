import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

import { Member } from "src/members/entities/member.entity";

@Entity('identification_requests')
export class IdentificationRequest {
    
    @PrimaryGeneratedColumn('uuid', {
        name: 'id_identification_request',
    })
    idIdentificationRequest: string;

    @Column({type: 'varchar', length: 50})
    firstName: string

    @Column({type: 'varchar', length: 50})
    lastName: string

    @Column({type: 'varchar', length: 50})
    email: string

    @Column({ type: 'uuid', name: 'id_member' })
    idMember: string;

    @OneToOne(() => Member, (member) => member.identificationRequest)
    @JoinColumn({ name: 'id_member' })
    member: Member

}
