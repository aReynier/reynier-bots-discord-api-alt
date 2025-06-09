import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/course.entity';
import { Member } from '../../members/entities/member.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Role } from '../../roles/entities/role.entity';
import { GuildTemplate } from '../../guilds-templates/entities/guild-template.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { Category } from '../../categories/entities/category.entity';
import { Campus } from '../../campuses/entities/campus.entity';
import { IsArray, IsDate, IsObject, IsOptional, IsString, Length, Matches, IsInt } from 'class-validator';

@Entity('guilds')
export class Guild {
  @ApiProperty({
    description: 'ID Discord du serveur',
    example: '123456789012345678',
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_guild' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuild: string;

  @ApiProperty({
    description: 'Nom du serveur',
    example: 'Simplon Server',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Nombre de membres',
    example: 100
  })
  @Column({ type: 'int', name: 'member_count' })
  @IsInt()
  memberCount: number;

  @ApiProperty({
    description: 'Configuration du serveur',
    example: { welcomeChannel: '123456789012345678', prefix: '!' },
  })
  @Column({ type: 'jsonb', nullable: true })
  @IsObject()
  configuration: Record<string, any>;

  @ApiProperty({
    description: 'Date de création',
  })
  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description: 'Membres de la guilde',
    type: () => [Member]
  })
  @OneToMany(() => Member, (member) => member.guild, { lazy: true })
  members: Promise<Member[]>;

  @ApiProperty({
    description: 'Promotions de la guilde',
    type: () => [Promotion]
  })
  @OneToMany(() => Promotion, (promotion) => promotion.guild)
  @IsArray()
  promotions: Promotion[];

  @ApiProperty({
    description: 'Formations associées à la guilde',
    type: () => [Course]
  })
  @OneToMany(() => Course, course => course.guild)
  @IsArray()
  courses: Course[];

  @ApiProperty({
    description: 'Rôles de la guilde',
    type: () => [Role]
  })
  @OneToMany(() => Role, role => role.guild)
  @IsArray()
  roles: Role[];

  @ApiProperty({
    description: 'Template de la guilde',
    type: () => GuildTemplate
  })
  @OneToOne(() => GuildTemplate, template => template.guild)
  template: GuildTemplate;

  @ApiProperty({
    description: 'Canaux de la guilde',
    type: () => [Channel]
  })
  @OneToMany(() => Channel, channel => channel.guild)
  @IsArray()
  channels: Channel[];

  @ApiProperty({
    description: 'Catégories de la guilde',
    type: () => [Category]
  })
  @OneToMany(() => Category, category => category.guild)
  @IsArray()
  categories: Category[];

  @ApiProperty({
    description: 'Campus associés à la guilde',
    type: () => [Campus]
  })
  @OneToMany(() => Campus, campus => campus.guild)
  @IsArray()
  campuses: Campus[];
}
