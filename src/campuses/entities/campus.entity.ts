import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Category } from 'src/categories/entities/category.entity';
import { IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

@Entity('Campuses')
export class Campus {
  @ApiProperty({
    description: 'SF unique du campus',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_campus' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCampus: string;

  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString()
  @Length(2,50, { message: 'Le nom doit contenir entre 2 et 501 caractères'})
  @Matches(
    /^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, 
    { message: 'Le nom ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' }
  )
  name: string;

  @ApiProperty({
    description: 'id Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19 })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idGuild: string;

  @ApiProperty({
    description: 'id Discord de la catégorie associée',
    example: '123456789012345678'
  })
  @Column({ name: 'id_category', type: 'varchar', length: 19 })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idCategory: string;

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
    description: 'Le serveur Discord associé au campus',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.campuses)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @Column({ type: 'varchar', length: 19, name: 'id_role' })
  @IsString()
  @Length(17, 19, { message: 'Le snowflake doit contenir entre 17 et 19 caractères' })
  @Matches(/^\d+$/, { message: 'Le snowflake doit contenir uniquement des chiffres' })
  idRole: string;

  @OneToOne(() => Role, role => role.campus)
  @JoinColumn({ name: 'id_role' })
  role: Role

  @ApiProperty({
    description: 'Promotions associées à ce campus',
    type: () => [Promotion]
  })
  @OneToMany(() => Promotion, promotion => promotion.campus)
  promotions: Promotion[];

  @ApiProperty({
    description: 'La catégorie associée au campus',
    type: () => Category
  })
  @ManyToOne(() => Category, category => category.campuses)
  @JoinColumn({ name: 'id_category' })
  category: Category;
}
