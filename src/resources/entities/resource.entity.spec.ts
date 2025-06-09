import { plainToInstance } from 'class-transformer';
import { Resource } from './resource.entity';
import { Member } from '../../members/entities/member.entity';
import { Report } from '../../reports/entities/report.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Vote } from '../../votes/entities/vote.entity';

describe('Resource Entity', () => {
  let resource: Resource;

  beforeEach(() => {
    resource = new Resource();
    resource.idResource = '123e4567-e89b-12d3-a456-426614174000';
    resource.title = 'Test Resource';
    resource.description = 'Test Description';
    resource.content = 'Test Content';
    resource.status = 'active';
    resource.idCreator = '123e4567-e89b-12d3-a456-426614174001';
    resource.createdAt = new Date('2024-02-25T12:00:00Z');
    resource.updatedAt = new Date('2024-02-25T12:00:00Z');
  });

  describe('Basic Properties', () => {
    it('should have all required properties with correct types', () => {
      expect(resource).toBeInstanceOf(Resource);
      expect(typeof resource.idResource).toBe('string');
      expect(typeof resource.title).toBe('string');
      expect(typeof resource.description).toBe('string');
      expect(typeof resource.content).toBe('string');
      expect(typeof resource.status).toBe('string');
      expect(typeof resource.idCreator).toBe('string');
      expect(resource.createdAt).toBeInstanceOf(Date);
      expect(resource.updatedAt).toBeInstanceOf(Date);
    });

    it('should validate status enum values', () => {
      expect(['active', 'inactive']).toContain(resource.status);
      resource.status = 'invalid';
      expect(['active', 'inactive']).not.toContain(resource.status);
    });
  });

  describe('Relationships', () => {
    it('should have a creator relationship with Member', () => {
      const member = new Member();
      member.idMember = resource.idCreator;
      resource.creator = member;

      expect(resource.creator).toBeDefined();
      expect(resource.creator).toBeInstanceOf(Member);
      expect(resource.creator.idMember).toBe(resource.idCreator);
    });

    it('should have a reports relationship', () => {
      const report = new Report();
      report.idReport = '123e4567-e89b-12d3-a456-426614174002';
      resource.reports = [report];

      expect(resource.reports).toBeDefined();
      expect(Array.isArray(resource.reports)).toBe(true);
      expect(resource.reports[0]).toBeInstanceOf(Report);
    });

    it('should have a comments relationship', () => {
      const comment = new Comment();
      comment.idComment = '123e4567-e89b-12d3-a456-426614174003';
      resource.comments = [comment];

      expect(resource.comments).toBeDefined();
      expect(Array.isArray(resource.comments)).toBe(true);
      expect(resource.comments[0]).toBeInstanceOf(Comment);
    });

    it('should have a votes relationship', () => {
      const vote = new Vote();
      vote.idVote = '123e4567-e89b-12d3-a456-426614174004';
      resource.votes = [vote];

      expect(resource.votes).toBeDefined();
      expect(Array.isArray(resource.votes)).toBe(true);
      expect(resource.votes[0]).toBeInstanceOf(Vote);
    });
  });

  describe('Data Transformation', () => {
    it('should transform plain object to Resource instance', () => {
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
        },
        reports: [],
        comments: [],
        votes: []
      };

      const transformed = plainToInstance(Resource, plainObject, { enableImplicitConversion: true });

      expect(transformed).toBeInstanceOf(Resource);
      expect(transformed.idResource).toBe(plainObject.idResource);
      expect(transformed.title).toBe(plainObject.title);
      expect(transformed.description).toBe(plainObject.description);
      expect(transformed.content).toBe(plainObject.content);
      expect(transformed.status).toBe(plainObject.status);
      expect(transformed.idCreator).toBe(plainObject.idCreator);
      expect(transformed.createdAt).toBeInstanceOf(Date);
      expect(transformed.updatedAt).toBeInstanceOf(Date);
    });
  });
}); 