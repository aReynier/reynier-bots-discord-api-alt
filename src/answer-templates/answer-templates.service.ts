import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAnswerTemplateDto } from './dto/update-answer-template.dto';
import { AnswerTemplate } from './entities/answer-template.entity';
import { CreateAnswerQuestionTemplateDto } from './dto/create-answer-question-template.dto';

@Injectable()
export class AnswerTemplatesService {
  constructor(
    @InjectRepository(AnswerTemplate)
    private answersRepository: Repository<AnswerTemplate>,
  ) {}

  async create(createAnswerQuestionDto: CreateAnswerQuestionTemplateDto) {
    if (!createAnswerQuestionDto) {
      throw new BadRequestException('Answer data is required');
    }
    const answer = this.answersRepository.create(createAnswerQuestionDto);
    return this.answersRepository.save(answer);
  }

  async findAll() {
    const answers = await this.answersRepository.find();
    if (!answers.length) {
      throw new NotFoundException('No answers found');
    }
    return answers;
  }

  async findOne(idAnswerTemplate: string) {
    if (!idAnswerTemplate) {
      throw new BadRequestException('idAnswerTemplate is required');
    }
    const answer = await this.answersRepository.findOneBy({ idAnswerTemplate });
    if (!answer) {
      throw new NotFoundException(`Answer with id "${idAnswerTemplate}" not found`);
    }
    return answer;
  }

  async update(idAnswerTemplate: string, updateAnswerDto: UpdateAnswerTemplateDto) {
    if (!idAnswerTemplate) {
      throw new BadRequestException('id is required');
    }
    if (!updateAnswerDto) {
      throw new BadRequestException('Update data is required');
    }
    const answer = await this.answersRepository.findOneBy({ idAnswerTemplate });
    if (!answer) {
      throw new NotFoundException(`Answer with id "${idAnswerTemplate}" not found`);
    }
    Object.assign(answer, updateAnswerDto);
    return this.answersRepository.save(answer);
  }

  async remove(idAnswerTemplate: string) {
    if (!idAnswerTemplate) {
      throw new BadRequestException('id is required');
    }
    const result = await this.answersRepository.delete({ idAnswerTemplate });
    if (result.affected === 0) {
      throw new NotFoundException(`Answer with id "${idAnswerTemplate}" not found`);
    }
    return { deleted: true };
  }
}
