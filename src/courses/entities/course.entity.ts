import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Guild } from '../../guilds/entities/guild.entity';
import { Role } from '../../roles/entities/role.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Channel } from '../../channels/entities/channel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('courses')
export class Course {

  @ApiProperty({
    description: 'SF discord de la formation',
    example: '123456789012345678',
  })
  @PrimaryColumn({ type: 'varchar', length: 19, name: 'id_course' })
    idCourse: string;

  @ApiProperty({
    description: 'Nom de la formation',
    example: 'Développeur web',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ApiProperty({
    description: 'Indique si la formation est certifiée',
    example: true,
  })
  @Column({ type: 'boolean' })
  isCertified: boolean;

  @ApiProperty({
    description: 'Date de création',
    example: '2024-02-17T12:00:00Z',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour',
    example: '2024-02-17T12:00:00Z',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Guilde associée aux formations',
    type: () => Guild,
  })
  @ManyToOne(() => Guild, (guild) => guild.courses)
  @JoinColumn({ name: 'id_guild' })
  guild: Guild;

  @ApiProperty({
    description: 'SF unique de la guilde',
    example: '123456789012345678',
  })
  @Column({ name: 'id_guild', type: 'varchar', length: 19})
    idGuild: string;
  
  @ApiProperty({
    description: 'Catégorie associée à la formation',
    type: () => Category
  })
  @ManyToOne(() => Category, category => category.courses)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @ApiProperty({
    description: 'id unique de la catégorie',
    example: '123456789012345678'
  })
  @Column({
    name: 'id_category',
    type: 'varchar',
    length: 19
  })
  idCategory: string;
  
  @ApiProperty({
    description: 'Rôles associés aux formations',
    type: () => [Role],
    isArray: true,
    nullable: true
  })
  
  @ManyToMany(() => Role, role => role.courses, { nullable: true })
  @JoinTable({
    name: 'courses_roles',
    joinColumns: [{
        name: 'id_course',
        referencedColumnName: 'idCourse'
    }],
    inverseJoinColumns: [{
        name: 'id_role',
        referencedColumnName: 'idRole'
    }]
  })
  roles: Role[];

  @ApiProperty({
    description: 'Promotions associées à la formation',
    type: () => [Promotion],
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Promotion, (promotion) => promotion.course)
  promotions: Promotion[];

  @ApiProperty({
    description: 'Channels associés à la formation',
    type: () => [Channel],
    isArray: true,
    nullable: true,
  })
  @OneToMany(() => Channel, (channel) => channel.course)
  channels: Channel[];
}
