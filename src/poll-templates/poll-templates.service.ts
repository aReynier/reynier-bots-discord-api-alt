import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePollTemplateDto } from './dto/create-poll-template.dto';
import { UpdatePollTemplateDto } from './dto/update-poll-template.dto';
import { PollTemplate } from './entities/poll-template.entity';
import { DeleteResult, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class PollTemplatesService {
  constructor(
    @InjectRepository(PollTemplate)
    private pollTemplateRepository: Repository<PollTemplate>,
  ) {}

  create(createPollTemplateDto: CreatePollTemplateDto) : Promise<PollTemplate> {
    const pollTemplate = this.pollTemplateRepository.create(createPollTemplateDto);
    return this.pollTemplateRepository.save(pollTemplate);
  }

  findAll() : Promise<PollTemplate[]> {
    return this.pollTemplateRepository.find();
  }

  async findOne(idPollTemplate: string): Promise<PollTemplate> {
    if (!isUUID(idPollTemplate)) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    const pollTemplate = await this.pollTemplateRepository.findOne({ where: { idPollTemplate: idPollTemplate } });
    if (!pollTemplate) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    return pollTemplate;
  }

  async update(idPollTemplate: string, updatePollTemplateDto: UpdatePollTemplateDto) : Promise<PollTemplate> {
    if (!isUUID(idPollTemplate)) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    const pollTemplate = await this.pollTemplateRepository.preload({
      idPollTemplate,
      ...updatePollTemplateDto
    })
    if (!pollTemplate) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    return this.pollTemplateRepository.save(pollTemplate); 
  }

  async remove(idPollTemplate: string) : Promise<DeleteResult> {
    if (!isUUID(idPollTemplate)) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    const pollTemplate = await this.pollTemplateRepository.findOne({ where: { idPollTemplate } });
    if (!pollTemplate) {
      throw new NotFoundException(`The poll template with id ${idPollTemplate} does not exist`);
    }
    return await this.pollTemplateRepository.delete(idPollTemplate);
  }
}
