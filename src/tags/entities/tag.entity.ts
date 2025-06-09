import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tags')
export class Tag {
  @ApiProperty({ description: 'Identifiant unique du tag' })
  @PrimaryGeneratedColumn('uuid', { name: 'id_tag' })
  idTag: string;

  @ApiProperty({ description: 'Nom du tag' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Description du tag' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Date de création du tag' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière modification du tag' })
  @UpdateDateColumn()
  updatedAt: Date;
}
