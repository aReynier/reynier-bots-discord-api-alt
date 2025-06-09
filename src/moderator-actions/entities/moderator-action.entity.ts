import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Report } from '../../reports/entities/report.entity';
import { Member } from '../../members/entities/member.entity';
import { Resource } from '../../resources/entities/resource.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum ActionType {
  WARNING = 'warning',
  BAN = 'ban',
  CONTENT_REMOVAL = 'content_removal',
  RESOLVED = 'resolved',
  REJECTED = 'rejected'
}

@Entity('moderator_actions')
export class ModeratorAction {
  @ApiProperty({
    description: 'id unique de l\'action de modération',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id_moderation' })
  idModeration: string;

  @ApiProperty({
    description: 'Type d\'action prise',
    enum: ActionType,
    example: ActionType.WARNING
  })
  @Column({
    type: 'enum',
    enum: ActionType,
    name: 'action_type'
  })
  actionType: ActionType;

  @ApiProperty({
    description: 'Raison de l\'action',
    example: 'Contenu inapproprié'
  })
  @Column({ type: 'varchar', length: 255, name: 'action_reason' })
  actionReason: string;

  @ApiProperty({
    description: 'Date de création de l\'action',
    example: '2024-03-14T12:00:00Z'
  })
  @CreateDateColumn({ name: 'action_created_at' })
  actionCreatedAt: Date;

  // Relation avec le modérateur
  @ManyToOne(() => Member)
  @JoinColumn({ name: 'id_moderator' })
  moderator: Member;

  @ApiProperty({
    description: 'id du modérateur',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ type: 'uuid', name: 'id_moderator' })
  idModerator: string;

  // Relation avec le signalement
  @ManyToOne(() => Report)
  @JoinColumn({ name: 'id_report' })
  report: Report;

  @ApiProperty({
    description: 'id du signalement',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ type: 'uuid', name: 'id_report' })
  idReport: string;

  // Relations avec les cibles possibles
  @ManyToOne(() => Resource, { nullable: true })
  @JoinColumn({ name: 'id_resource' })
  resource?: Resource;

  @Column({ type: 'uuid', name: 'id_resource', nullable: true })
  idResource?: string;

  @ManyToOne(() => Member, { nullable: true })
  @JoinColumn({ name: 'id_target_member' })
  targetMember?: Member;

  @Column({ type: 'uuid', name: 'id_target_member', nullable: true })
  idTargetMember?: string;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'id_comment' })
  comment?: Comment;

  @Column({ type: 'uuid', name: 'id_comment', nullable: true })
  idComment?: string;

  @ApiProperty({
    description: 'Date de dernière modification de l\'action',
    example: '2024-01-01T00:00:00Z'
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
