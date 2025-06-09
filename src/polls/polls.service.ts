import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
  ) {}

  create(createPollDto: CreatePollDto) {
    const poll = this.pollRepository.create(createPollDto);
    return this.pollRepository.save(poll)
  }

  findAll() {
    return this.pollRepository.find();
  }

  async findOne(idPoll: string): Promise<Poll> {
    if(!isUUID(idPoll)) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    const poll = await this.pollRepository.findOneBy({ idPoll });
    if (!poll) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    return poll;
  }

  async update(idPoll: string, updatePollDto: UpdatePollDto) {
    if(!isUUID(idPoll)) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    const poll = await this.pollRepository.findOneBy({ idPoll });
    if (!poll) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    Object.assign(poll, updatePollDto);
    return this.pollRepository.save(poll);
  }

  async remove(idPoll: string) {
    if(!isUUID(idPoll)) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    const poll = await this.pollRepository.findOneBy({ idPoll });
    if (!poll) {
      throw new NotFoundException(`The poll with id "${idPoll}" was not found`);
    }
    return this.pollRepository.delete({idPoll})
  }
}
