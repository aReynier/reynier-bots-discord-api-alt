import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../../channels/entities/channel.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Course } from '../../courses/entities/course.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { GuildTemplate } from 'src/guilds-templates/entities/guild-template.entity';
import { Campus } from '../../campuses/entities/campus.entity';
import { IsArray, IsString, Length, Matches, IsInt, IsDate, IsOptional } from 'class-validator';

@Entity('categories')
export class Category {
  @ApiProperty({
    description: 'SF Discord de la catégorie',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_category' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCategory: string;

  @ApiProperty({
    description: 'Le nom de la catégorie',
    example: 'Général',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @Length(2,50, { message: 'Le nom doit contenir entre 2 et 50 caractères'})
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
    { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
  )
  name: string;

  @ApiProperty({
    description: 'La position de la catégorie',
    example: 1
  })
  @Column({ type: 'int', name: 'category_position' })
  @IsInt()
  categoryPosition: number;

  @ApiProperty({
    description: 'ID Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19 })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuild: string;

  @ApiProperty({
    description: 'Date de création'
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'Liste des channels dans cette catégorie',
    type: () => Channel,
    isArray: true
  })
  @OneToMany(() => Channel, channel => channel.category)
  @IsArray()
  channels: Channel[];

  @ApiProperty({
    description: 'Formations associées à la catégorie',
    type: () => [Course]
  })
  @OneToMany(() => Course, course => course.category)
  @IsArray()
  courses: Course[]; 

  @ApiProperty({
    description: 'Le serveur Discord associé à cette catégorie',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.categories)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @ApiProperty({
    description: 'Promotion associée à cette catégorie',
    type: () => Promotion
  })
  @OneToOne(() => Promotion, promotion => promotion.category)
  promotion: Promotion;

  @ApiProperty({
    description: 'ID Discord du template de serveur associé',
    example: '123456789012345678',
    required: false
  })
  @Column({ name: 'id_guild_template', type: 'varchar', length: 19, nullable: true })
  idGuildTemplate: string;

  @ApiProperty({
    description: 'Template de serveur associé à cette catégorie',
    type: () => GuildTemplate
  })
  @OneToOne(() => GuildTemplate, guildTemplate => guildTemplate.category)
  @JoinColumn({ name: 'id_guild_template' })
  guildTemplate: GuildTemplate;

  @ApiProperty({
    description: 'Liste des campus dans cette catégorie',
    type: () => Campus,
    isArray: true
  })
  @OneToMany(() => Campus, campus => campus.category)
  @IsArray()
  campuses: Campus[];
}
