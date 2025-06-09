import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionPollDto } from './dto/create-question-poll.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create(createQuestionPollDto: CreateQuestionPollDto) {
    const question = this.questionRepository.create(createQuestionPollDto);
    return this.questionRepository.save(question)
  }

  findAll() {
    return this.questionRepository.find();
  }

  findOne(idQuestion: string) {
    return this.questionRepository.findOneBy({ idQuestion });
  }

  async update(idQuestion: string, UpdateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOneBy({ idQuestion });
    if (!question) {
      return null;
    }
    Object.assign(question, UpdateQuestionDto);
    return this.questionRepository.save(question);
  }

  remove(idQuestion: string) {
    return this.questionRepository.delete({idQuestion})
  }
}