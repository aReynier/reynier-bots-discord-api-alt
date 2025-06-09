import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity('Campuses')
export class Campus {
  @ApiProperty({
    description: 'SF unique du campus',
    example: '123456789012345678'
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_campus' })
  idCampus: string;

  @ApiProperty({
    description: 'Nom du campus',
    example: 'Simplon Paris',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'id Discord du serveur associé',
    example: '123456789012345678'
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19 })
  idGuild: string;

  @ApiProperty({
    description: 'id Discord de la catégorie associée',
    example: '123456789012345678'
  })
  @Column({ name: 'id_category', type: 'varchar', length: 19 })
  idCategory: string;

  @ApiProperty({
    description: 'Date de création'
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour'
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Le serveur Discord associé au campus',
    type: () => Guild
  })
  @ManyToOne(() => Guild, guild => guild.campuses)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @Column({ type: 'varchar', name: 'id_role' })
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
