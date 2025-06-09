import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Member } from 'src/members/entities/member.entity';
import { IsEmail, IsOptional, IsString, Length, Matches, IsUUID, IsDate, MaxLength } from 'class-validator';

@Entity('members_informations')
export class MemberInformation {
  @ApiProperty({
    description: 'UUID unique des informations du membre',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id_members_infos' })
  @IsUUID()
  idMemberInfos: string;

  @ApiProperty({
    description: 'Prénom du membre',
    example: 'John'
  })
  @Column({ name: 'firstname', type: 'varchar', length: 50 })
  @IsString()
  @Length(2, 50, { message: 'Le prénom doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le prénom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
  firstName: string;

  @ApiProperty({
    description: 'Nom du membre',
    example: 'Doe'
  })
  @Column({ name: 'lastname', type: 'varchar', length: 50 })
  @IsString()
  @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), espaces, tirets et underscores' })
  lastName: string;

  @ApiProperty({
    description: 'Email du membre',
    example: 'john.doe@example.com'
  })
  @Column({ type: 'varchar', length: 100 })
  @IsEmail()
  @MaxLength(255)
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+@[a-zA-ZÀ-ÿ0-9\s\-_]+\.[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'L\'email doit être au format email' })
  email: string;

  @ApiProperty({
    description: 'Date de création'
  })
  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @OneToOne(() => Member, (member) => member.memberInformation)
  @JoinColumn({ name: 'id_member' })
  member: Member;
} 