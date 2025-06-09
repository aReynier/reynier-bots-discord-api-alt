import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentsRepository.create(createCommentDto);
    return await this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentsRepository.find({
      relations: ['member', 'resource'],
      order: {
        createdAt: 'DESC'
      }
    });
  }

  async findOne(idComment: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { idComment: idComment },
      relations: ['member', 'resource']
    });
    
    if (!comment) {
      throw new NotFoundException(`Commentaire avec l'id ${idComment} non trouvé`);
    }
    
    return comment;
  }

  async findByResource(idResource: string): Promise<Comment[]> {
    const comments = await this.commentsRepository.find({
      where: { idResource },
      relations: ['member', 'resource'],
      order: {
        createdAt: 'DESC'
      }
    });

    return comments;
  }

  async update(idComment: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(idComment);
    
    Object.assign(comment, updateCommentDto);
    
    return await this.commentsRepository.save(comment);
  }

  async remove(idComment: string): Promise<void> {
    const result = await this.commentsRepository.delete({ idComment: idComment });
    
    if (result.affected === 0) {
      throw new NotFoundException(`Commentaire avec l'id ${idComment} non trouvé`);
    }
  }
}
