import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Member } from '../members/entities/member.entity';
import { plainToInstance } from 'class-transformer';
import { ResourceResponseDto } from './dto/responses/resource.response.dto';
import { Comment } from '../comments/entities/comment.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<ResourceResponseDto> {
    const { idMember, ...resourceData } = createResourceDto;
    
    // On cherche le membre
    const member = await this.membersRepository.findOne({
      where: { idMember }
    });
    if (!member) {
      throw new NotFoundException(`Member with id ${idMember} not found`);
    }

    // On crée la ressource avec le membre et son id
    const resource = this.resourcesRepository.create({
      ...resourceData,
      creator: member,
      idCreator: member.idMember
    });
    
    const savedResource = await this.resourcesRepository.save(resource);
    const resourceWithRelations = await this.resourcesRepository.findOne({
      where: { idResource: savedResource.idResource },
      relations: [
        'creator',
        'reports',
        'reports.reporter',
        'votes',
        'votes.member',
        'comments',
        'comments.member',
        'comments.votes',
        'comments.votes.member'
      ]
    });
    return plainToInstance(ResourceResponseDto, resourceWithRelations, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<ResourceResponseDto[]> {
    const resources = await this.resourcesRepository.find({
      relations: [
        'creator',
        'reports',
        'reports.reporter',
        'votes',
        'votes.member',
        'comments',
        'comments.member',
        'comments.votes',
        'comments.votes.member'
      ],
      order: {
        createdAt: 'DESC'
      }
    });
    return resources.map(resource => 
      plainToInstance(ResourceResponseDto, resource, { excludeExtraneousValues: true })
    );
  }

  async findOne(idResource: string): Promise<ResourceResponseDto> {
    const resource = await this.resourcesRepository.findOne({
      where: { idResource: idResource },
      relations: [
        'creator',
        'reports',
        'reports.reporter',
        'votes',
        'votes.member',
        'comments',
        'comments.member',
        'comments.votes',
        'comments.votes.member'
      ]
    });

    if (!resource) {
      throw new NotFoundException(`Resource with id ${idResource} not found`);
    }

    return plainToInstance(ResourceResponseDto, resource, { excludeExtraneousValues: true });
  }

  async findComments(idResource: string): Promise<Comment[]> {
    // Vérifie d'abord si la ressource existe
    const resource = await this.resourcesRepository.findOne({
      where: { idResource: idResource }
    });

    if (!resource) {
      throw new NotFoundException(`Resource with id ${idResource} not found`);
    }

    // Récupère les commentaires de la ressource
    const comments = await this.commentsRepository.find({
      where: { idResource: idResource },
      relations: ['member', 'resource', 'votes', 'votes.member'],
      order: {
        createdAt: 'DESC'
      }
    });

    return comments;
  }

  async update(idResource: string, updateResourceDto: UpdateResourceDto): Promise<ResourceResponseDto> {
    const existingResource = await this.resourcesRepository.findOne({
      where: { idResource: idResource }
    });
    
    if (!existingResource) {
      throw new NotFoundException(`Resource with id ${idResource} not found`);
    }

    const updatedResource = await this.resourcesRepository.save({
      ...existingResource,
      ...updateResourceDto
    });

    const resourceWithRelations = await this.resourcesRepository.findOne({
      where: { idResource: updatedResource.idResource },
      relations: [
        'creator',
        'reports',
        'reports.reporter',
        'votes',
        'votes.member',
        'comments',
        'comments.member',
        'comments.votes',
        'comments.votes.member'
      ]
    });

    return plainToInstance(ResourceResponseDto, resourceWithRelations, { excludeExtraneousValues: true });
  }

  async remove(idResource: string): Promise<void> {
    const resource = await this.resourcesRepository.findOne({
      where: { idResource: idResource }
    });
    
    if (!resource) {
      throw new NotFoundException(`Resource with id ${idResource} not found`);
    }

    await this.resourcesRepository.remove(resource);
  }
} 