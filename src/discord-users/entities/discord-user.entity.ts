import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Member } from 'src/members/entities/member.entity';
import { DashboardAccount } from 'src/dashboard-accounts/entities/dashboard-account.entity';
import { IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

@Entity('discord_users')
export class DiscordUser {

  @ApiProperty({
    description: 'SF Discord de l\'utilisateur',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_discord' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idDiscord: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur Discord',
    example: 'JohnDoe (de JohnDoe#1234)'
  })
  @Column({ type: 'varchar', length: 32, name: 'discord_username' })
  @IsString()
  @Length(2, 32, { message: 'Le nom d\'utilisateur doit contenir entre 2 et 32 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom d\'utilisateur ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  discordUsername: string;

  @ApiProperty({
    description: 'Discriminateur Discord',
    example: '1234'
  })
  @Column({ type: 'varchar', length: 4, name: 'discriminator' })
  @IsString()
  @Length(4, 4, { message: 'Le discriminateur doit contenir 4 caractères' })
  @Matches(/^\d+$/, { message: 'Le discriminateur doit contenir uniquement des chiffres' })
  discriminator: string;

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

  @OneToOne(() => Member, member => member.discordUser)
  member: Member;

  @OneToOne(() => DashboardAccount, dashboardAccount => dashboardAccount.discordUser)
  dashboardAccount: DashboardAccount

} 