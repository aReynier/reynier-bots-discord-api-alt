import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, JoinTable, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Guild } from '../../guilds/entities/guild.entity'
import { MemberInformation } from '../../members-informations/entities/member-information.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IdentificationRequest } from 'src/identification-requests/entities/identification-request.entity';
import { DiscordUser } from 'src/discord-users/entities/discord-user.entity';
import { Resource } from '../../resources/entities/resource.entity';
import { XpTransaction } from '../../xp-transactions/entities/xp-transaction.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { Poll } from 'src/polls/entities/poll.entity';
import { Answer } from 'src/answers/entities/answer.entity';
import { IsDate, IsDecimal, IsInt, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';


@Entity('members')
export class Member {

  @ApiProperty({
    description: 'UUID unique du membre',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id_member' })
  @IsUUID()
  idMember: string;

  @ApiProperty({
    description: 'Nom d\'utilisateur du membre dans la guilde',
    example: 'JohnDoe',
    maxLength: 50
  })
  @Column({ type: 'varchar', length: 32, name: 'guild_username' })
  @IsString()
  @Length(1, 32, { message: 'Le nom d\'utilisateur doit contenir entre 2 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le nom d\'utilisateur ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  guildUsername: string;

  @ApiProperty({
    description: 'Points d\'expérience du membre',
    example: '100.00'
  })
  @Column({ type: 'decimal', precision: 15, scale: 2, name: 'xp' })
  @IsDecimal()
  xp: string;

  @ApiProperty({
    description: 'Niveau du membre',
    example: 1
  })
  @Column({ type: 'int', name: 'level' })
  @IsInt()
  level: number;

  @ApiProperty({
    description: 'Rôle communautaire du membre',
    example: 'Member'
  })
  @Column({ type: 'varchar', length: 50, name: 'community_role' })
  @IsString()
  @Length(1, 50, { message: 'Le rôle communautaire doit contenir entre 1 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le rôle communautaire ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  communityRole: string;

  @ApiProperty({
    description: 'Statut du membre',
    example: 'Active',
    enum: ['Active', 'Inactive', 'Banned']
  })
  @Column({ type: 'varchar', length: 50, name: 'status' })
  @IsString()
  @Length(1, 50, { message: 'Le statut doit contenir entre 1 et 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-_]+$/, { message: 'Le statut ne peut contenir que des lettres (avec accents), chiffres, espaces, tirets et underscores' })
  status: string;

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
    description: 'UUID de la guilde',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @Column({ type: 'uuid', name: 'id_guild' })
  @IsUUID()
  idGuild: string;

  @ApiProperty({
    description: 'Relation avec la guilde'
  })
  @ManyToOne(() => Guild, (guild) => guild.members, { lazy: true })
  @JoinColumn({ name: 'id_guild' })
  guild: Promise<Guild>;

  @Column({ type: 'uuid', name: 'id_discord' }) 
  @IsUUID()
  idDiscord: string;

  @OneToOne(() => DiscordUser, (discordUser) => discordUser.member)
  @JoinColumn({ name: 'id_discord' })
  discordUser: DiscordUser;

  @OneToOne(() => MemberInformation, (memberInformation) => memberInformation.member)
  memberInformation: MemberInformation;

  @OneToOne(() => IdentificationRequest, (identificationRequest) => identificationRequest.member)
  identificationRequest: IdentificationRequest;

  @ApiProperty({
    description: 'Les ressources créées par ce membre',
    type: () => [Resource]
  })
  @OneToMany(() => Resource, resource => resource.creator)
  resources: Resource[];

  @ApiProperty({
    description: 'Historique des transactions XP du membre',
    type: () => [XpTransaction]
  })
  @OneToMany(() => XpTransaction, transaction => transaction.member)
  xpTransactions: XpTransaction[];

  @ApiProperty({
    description: 'Rôles du membre',
    type: () => [Role]
  })
  @ManyToMany(() => Role, (role) => role.members)
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    description: 'Les commentaires du membre',
    type: () => [Comment]
  })
  @OneToMany(() => Comment, comment => comment.member)
  comments: Comment[];

  @ApiProperty({
    description: 'Promotions suivies par le membre',
    type: () => [Promotion]
  })
  @ManyToMany(() => Promotion, promotion => promotion.followers)
  followedPromotions: Promotion[];

  @ApiProperty({
    description: 'Promotions gérées par le membre',
    type: () => [Promotion]
  })
  @ManyToMany(() => Promotion, promotion => promotion.managers)
  managedPromotions: Promotion[];

  @OneToMany(()=>Poll, poll => poll.author)
  polls: Poll[];

  @ManyToMany(() => Answer, (answer) => answer.members)
  answers: Answer[];

}
