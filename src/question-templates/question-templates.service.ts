import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionPollTemplateDto } from './dto/create-question-poll-template.dto';
import { UpdateQuestionTemplateDto } from './dto/update-question-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionTemplate } from './entities/question-template.entity';
import { DeleteResult, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class QuestionTemplatesService {
  constructor(
    @InjectRepository(QuestionTemplate)
    private questionTemplateRepository: Repository<QuestionTemplate>,
  ) {}

  create(createQuestionPollTemplateDto: CreateQuestionPollTemplateDto) : Promise<QuestionTemplate> {
    const questionTemplate = this.questionTemplateRepository.create(createQuestionPollTemplateDto);
    return this.questionTemplateRepository.save(questionTemplate);
  }

  findAll() : Promise<QuestionTemplate[]> {
    return this.questionTemplateRepository.find();
  }

  async findOne(idQuestionTemplate: string): Promise<QuestionTemplate> {
    if (!isUUID(idQuestionTemplate)) {
      throw new NotFoundException(`The question template with id ${idQuestionTemplate} does not exist`);
    }
    const questionTemplate = await this.questionTemplateRepository.findOne({ where: { idQuestionTemplate } });
    if (!questionTemplate) {
      throw new NotFoundException(`The question template with id ${idQuestionTemplate} does not exist`);
    }
    return questionTemplate;
  }

  async update(idQuestionTemplate: string, updateQuestionTemplateDto: UpdateQuestionTemplateDto) : Promise<QuestionTemplate> {
    if (!isUUID(idQuestionTemplate)) {
      throw new NotFoundException(`The question template with id ${idQuestionTemplate} does not exist`);
    }
    const questionTemplate = await this.questionTemplateRepository.preload({
      idQuestionTemplate,
      ...updateQuestionTemplateDto
    })
    if (!questionTemplate) {
      throw new NotFoundException(`The question template with UUID ${idQuestionTemplate} does not exist`);
    }
    return this.questionTemplateRepository.save(questionTemplate); 
  }

  async remove(idQuestionTemplate: string) : Promise<DeleteResult> {
    if (!isUUID(idQuestionTemplate)) {
      throw new NotFoundException(`The question template with id ${idQuestionTemplate} does not exist`);
    }
    const questionTemplate = await this.questionTemplateRepository.findOne({ where: { idQuestionTemplate } });
    if (!questionTemplate) {
      throw new NotFoundException(`The question template with id ${idQuestionTemplate} does not exist`);
    }
    return await this.questionTemplateRepository.delete(idQuestionTemplate);
  }
}
