import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Guild } from '../../guilds/entities/guild.entity';
import { Category } from '../../categories/entities/category.entity';
import { IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

@Entity('guilds_templates')
export class GuildTemplate {
  @ApiProperty({
    description: 'ID Discord du template',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_guild_template' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuildTemplate: string;  

  @ApiProperty({
    description: 'Nom du template',
    example: 'Template Serveur Formation'
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Description du template',
    example: 'Template pour les serveurs de formation',
    required: false
  })
  @Column({ type: 'text', nullable: true })
  @IsString()
  @Length(2, 500, { message: 'La description doit contenir entre 2 et 500 caractères' })
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_.,!?;:'"()\[\]]+$/, 
    { message: 'La description peut contenir des lettres (avec accents), chiffres, espaces, ponctuation basique (.!?;:,), guillemets, parenthèses et crochets' }
  )
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'id Discord du serveur associé',
    example: '123456789012345678',
    required: false
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuild: string;

  @ApiProperty({
    description: 'Configuration du template',
    example: {
      channels: ['général', 'annonces'],
      roles: ['admin', 'formateur', 'apprenant'],
      permissions: { default: ['READ_MESSAGES'] }
    },
    required: false
  })
  @Column({ 
    type: 'jsonb', 
    nullable: true,
    default: {
      channels: [],
      roles: [],
      permissions: {}
    }
  })
  configuration: Record<string, any>;

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

  @ApiProperty({
    description: 'Le serveur Discord associé à ce template',
    type: () => Guild,
    required: false
  })
  @OneToOne(() => Guild, guild => guild.template)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @ApiProperty({
    description: 'ID Discord de la catégorie associée',
    example: '123456789012345678',
    required: false
  })
  @Column({ name: 'id_category', type: 'varchar', length: 19, nullable: true })
  idCategory: string;

  @ApiProperty({
    description: 'Catégorie associée à ce template',
    type: () => Category
  })
  @OneToOne(() => Category, category => category.guildTemplate)
  @JoinColumn({ name: 'id_category' })
  category: Category;
}
