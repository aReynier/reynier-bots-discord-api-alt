import { plainToInstance } from 'class-transformer';
import { ResourceCreatorResponseDto, ResourceReportResponseDto, ResourceVoteResponseDto, ResourceCommentResponseDto, ResourceResponseDto } from './resource.response.dto';
import { ReportType, ReportCategory } from '../../../reports/entities/report.entity';
import { VoteType } from '../../../votes/entities/vote.entity';

describe('Resource Response DTOs', () => {
  describe('ResourceCreatorResponseDto', () => {
    it('should expose only allowed fields', () => {
      const plainObject = {
        idMember: '123e4567-e89b-12d3-a456-426614174000',
        guildUsername: 'TestUser',
        communityRole: 'Member',
        createdAt: new Date(),
        updatedAt: new Date(),
        level: 1,
        status: 'active',
        idDiscord: 'discord123',
        idGuild: 'guild123',
        xp: '100'
      };

      const transformed = plainToInstance(ResourceCreatorResponseDto, plainObject);

      // Should expose these fields
      expect(transformed.idMember).toBe(plainObject.idMember);
      expect(transformed.guildUsername).toBe(plainObject.guildUsername);
      expect(transformed.communityRole).toBe(plainObject.communityRole);

      // Should exclude these fields
      expect(transformed['createdAt']).toBeUndefined();
      expect(transformed['updatedAt']).toBeUndefined();
      expect(transformed['level']).toBeUndefined();
      expect(transformed['status']).toBeUndefined();
      expect(transformed['idDiscord']).toBeUndefined();
      expect(transformed['idGuild']).toBeUndefined();
      expect(transformed['xp']).toBeUndefined();
    });
  });

  describe('ResourceReportResponseDto', () => {
    it('should transform and expose all fields correctly', () => {
      const plainObject = {
        id_report: '123e4567-e89b-12d3-a456-426614174000',
        type: ReportType.RESOURCE,
        category: ReportCategory.INAPPROPRIATE,
        reason: 'Test reason',
        status: 'pending',
        created_at: '2024-02-25T12:00:00Z',
        reporter: {
          idMember: '123e4567-e89b-12d3-a456-426614174001',
          guildUsername: 'Reporter',
          communityRole: 'Member'
        }
      };

      const transformed = plainToInstance(ResourceReportResponseDto, plainObject, { enableImplicitConversion: true });

      expect(transformed.idReport).toBe(plainObject.id_report);
      expect(transformed.type).toBe(plainObject.type);
      expect(transformed.category).toBe(plainObject.category);
      expect(transformed.reason).toBe(plainObject.reason);
      expect(transformed.status).toBe(plainObject.status);
      expect(transformed.createdAt).toBeInstanceOf(Date);
      expect(transformed.reporter).toBeInstanceOf(ResourceCreatorResponseDto);
      expect(transformed.reporter.idMember).toBe(plainObject.reporter.idMember);
    });
  });

  describe('ResourceVoteResponseDto', () => {
    it('should transform and expose all fields correctly', () => {
      const plainObject = {
        idVote: '123e4567-e89b-12d3-a456-426614174000',
        voteType: VoteType.UPVOTE,
        createdAt: '2024-02-25T12:00:00Z',
        isActive: true,
        member: {
          idMember: '123e4567-e89b-12d3-a456-426614174001',
          guildUsername: 'Voter',
          communityRole: 'Member'
        }
      };

      const transformed = plainToInstance(ResourceVoteResponseDto, plainObject, { enableImplicitConversion: true });

      expect(transformed.idVote).toBe(plainObject.idVote);
      expect(transformed.voteType).toBe(plainObject.voteType);
      expect(transformed.createdAt).toBeInstanceOf(Date);
      expect(transformed.isActive).toBe(plainObject.isActive);
      expect(transformed.member).toBeInstanceOf(ResourceCreatorResponseDto);
      expect(transformed.member.idMember).toBe(plainObject.member.idMember);
    });
  });

  describe('ResourceCommentResponseDto', () => {
    it('should transform and expose all fields correctly', () => {
      const plainObject = {
        idComment: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Test comment',
        status: 'active',
        createdAt: '2024-02-25T12:00:00Z',
        member: {
          idMember: '123e4567-e89b-12d3-a456-426614174001',
          guildUsername: 'Commenter',
          communityRole: 'Member'
        },
        votes: [{
          idVote: '123e4567-e89b-12d3-a456-426614174002',
          voteType: VoteType.UPVOTE,
          createdAt: '2024-02-25T12:00:00Z',
          isActive: true,
          member: {
            idMember: '123e4567-e89b-12d3-a456-426614174003',
            guildUsername: 'Voter',
            communityRole: 'Member'
          }
        }]
      };

      const transformed = plainToInstance(ResourceCommentResponseDto, plainObject, { enableImplicitConversion: true });

      expect(transformed.idComment).toBe(plainObject.idComment);
      expect(transformed.content).toBe(plainObject.content);
      expect(transformed.status).toBe(plainObject.status);
      expect(transformed.createdAt).toBeInstanceOf(Date);
      expect(transformed.member).toBeInstanceOf(ResourceCreatorResponseDto);
      expect(transformed.member.idMember).toBe(plainObject.member.idMember);
      expect(transformed.votes[0]).toBeInstanceOf(ResourceVoteResponseDto);
      expect(transformed.votes[0].idVote).toBe(plainObject.votes[0].idVote);
    });
  });

  describe('ResourceResponseDto', () => {
    it('should transform and expose all fields with nested relationships', () => {
      const plainObject = {
        idResource: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Resource',
        description: 'Test Description',
        content: 'Test Content',
        status: 'active',
        idCreator: '123e4567-e89b-12d3-a456-426614174001',
        createdAt: '2024-02-25T12:00:00Z',
        updatedAt: '2024-02-25T12:00:00Z',
        creator: {
          idMember: '123e4567-e89b-12d3-a456-426614174001',
          guildUsername: 'Creator',
          communityRole: 'Member'
        },
        reports: [{
          id_report: '123e4567-e89b-12d3-a456-426614174002',
          type: ReportType.RESOURCE,
          category: ReportCategory.INAPPROPRIATE,
          reason: 'Test reason',
          status: 'pending',
          created_at: '2024-02-25T12:00:00Z',
          reporter: {
            idMember: '123e4567-e89b-12d3-a456-426614174003',
            guildUsername: 'Reporter',
            communityRole: 'Member'
          }
        }],
        votes: [{
          idVote: '123e4567-e89b-12d3-a456-426614174004',
          voteType: VoteType.UPVOTE,
          createdAt: '2024-02-25T12:00:00Z',
          isActive: true,
          member: {
            idMember: '123e4567-e89b-12d3-a456-426614174005',
            guildUsername: 'Voter',
            communityRole: 'Member'
          }
        }],
        comments: [{
          idComment: '123e4567-e89b-12d3-a456-426614174006',
          content: 'Test comment',
          status: 'active',
          createdAt: '2024-02-25T12:00:00Z',
          member: {
            idMember: '123e4567-e89b-12d3-a456-426614174007',
            guildUsername: 'Commenter',
            communityRole: 'Member'
          },
          votes: []
        }]
      };

      const transformed = plainToInstance(ResourceResponseDto, plainObject, { enableImplicitConversion: true });

      // Test basic fields
      expect(transformed.idResource).toBe(plainObject.idResource);
      expect(transformed.title).toBe(plainObject.title);
      expect(transformed.description).toBe(plainObject.description);
      expect(transformed.content).toBe(plainObject.content);
      expect(transformed.status).toBe(plainObject.status);
      expect(transformed.idCreator).toBe(plainObject.idCreator);
      expect(transformed.createdAt).toBeInstanceOf(Date);
      expect(transformed.updatedAt).toBeInstanceOf(Date);

      // Test nested relationships
      expect(transformed.creator).toBeInstanceOf(ResourceCreatorResponseDto);
      expect(transformed.creator.idMember).toBe(plainObject.creator.idMember);

      expect(transformed.reports[0]).toBeInstanceOf(ResourceReportResponseDto);
      expect(transformed.reports[0].idReport).toBe(plainObject.reports[0].id_report);
      expect(transformed.reports[0].reporter).toBeInstanceOf(ResourceCreatorResponseDto);

      expect(transformed.votes[0]).toBeInstanceOf(ResourceVoteResponseDto);
      expect(transformed.votes[0].idVote).toBe(plainObject.votes[0].idVote);
      expect(transformed.votes[0].member).toBeInstanceOf(ResourceCreatorResponseDto);

      expect(transformed.comments[0]).toBeInstanceOf(ResourceCommentResponseDto);
      expect(transformed.comments[0].idComment).toBe(plainObject.comments[0].idComment);
      expect(transformed.comments[0].member).toBeInstanceOf(ResourceCreatorResponseDto);
    });
  });
}); 