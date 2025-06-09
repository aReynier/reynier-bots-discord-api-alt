import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/course.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Campus } from 'src/campuses/entities/campus.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Member } from 'src/members/entities/member.entity';
import { IsArray, IsBoolean, IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

@Entity('promotions')
export class Promotion {
  @ApiProperty({
    description: 'SF unique de la promotion',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_promotion' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idPromotion: string;

  @ApiProperty({
    description: 'Nom de la promotion',
    example: 'Développeur Web 2024',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @Length(2, 100, { message: 'Le nom doit contenir entre 2 et 100 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  name: string;

  @ApiProperty({
    description: 'Statut de la promotion',
    example: true,
    default: true
  })
  @Column({ 
    type: 'boolean', 
    default: true
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Date de début de la promotion',
    example: '2024-01-01T00:00:00Z'
  })
  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Date de fin de la promotion',
    example: '2024-12-31T23:59:59Z'
  })
  @Column({ name: 'end_date', type: 'timestamp with time zone' })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z'
  })
  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
  
  @ApiProperty({
    description: 'id unique de la formation',
    example: '123456789012345678'
  })
  @Column({ name: 'id_course', type: 'varchar', length: 19})
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCourse: string;

  @ApiProperty({
    description: 'Formation associée à la promotion',
    type: () => Course
  })
  @ManyToOne(() => Course, course => course.promotions)
  @JoinColumn({ name: 'id_course' })
  course: Course;

  @ApiProperty({
    description: 'id du serveur Discord associé',
    example: '123456789012345678'
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuild: string;

  @ApiProperty({
    description: 'Serveur Discord associé à la promotion',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.promotions)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @ApiProperty({
    description: 'id du rôle Discord associé',
    example: '123456789012345678'
  })
  @Column({ name: 'id_role', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idRole: string;

  @ApiProperty({
    description: 'Rôle Discord associé à la promotion',
    type: () => Role
  })
  @OneToOne(() => Role, role => role.promotion)
  @JoinColumn({ name: 'id_role' })
  role: Role;

  // Nouvelle relation avec Campus
  @ApiProperty({
    description: 'id du campus associé',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ name: 'id_campus', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCampus: string;

  @ApiProperty({
    description: 'Campus associé à la promotion',
    type: () => Campus
  })
  @ManyToOne(() => Campus)
  @JoinColumn({ name: 'id_campus' })
  campus: Campus;

  // Nouvelle relation avec Category
  @ApiProperty({
    description: 'id de la catégorie Discord associée',
    example: '123456789012345678'
  })
  @Column({ name: 'id_category', type: 'varchar', length: 19, nullable: true })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCategory: string;

  @ApiProperty({
    description: 'Catégorie Discord associée à la promotion',
    type: () => Category
  })
  @OneToOne(() => Category)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  // Nouvelles relations ManyToMany avec Member
  @ApiProperty({
    description: 'Membres qui suivent cette promotion',
    type: () => [Member]
  })
  @ManyToMany(() => Member)
  @JoinTable({
    name: 'promotions_followers',
    joinColumns: [{ name: 'id_promotion', referencedColumnName: 'idPromotion' }],
    inverseJoinColumns: [{ name: 'id_member', referencedColumnName: 'idMember' }]
  })
  @IsArray()
  followers: Member[];

  @ApiProperty({
    description: 'Membres qui gèrent cette promotion',
    type: () => [Member]
  })
  @ManyToMany(() => Member)
  @JoinTable({
    name: 'promotions_managers',
    joinColumns: [{ name: 'id_promotion', referencedColumnName: 'idPromotion' }],
    inverseJoinColumns: [{ name: 'id_member', referencedColumnName: 'idMember' }]
  })
  @IsArray()
  managers: Member[];
}
