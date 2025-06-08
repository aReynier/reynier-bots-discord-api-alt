import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { QuestionTemplatesService } from './question-templates.service';
import { CreateQuestionPollTemplateDto } from './dto/create-question-poll-template.dto';
import { UpdateQuestionTemplateDto } from './dto/update-question-template.dto';

@Controller('question-templates')
export class QuestionTemplatesController {
  constructor(private readonly questionTemplatesService: QuestionTemplatesService) {}

  @Post()
  create(@Body() createQuestionPollTemplateDto: CreateQuestionPollTemplateDto) {
    return this.questionTemplatesService.create(createQuestionPollTemplateDto);
  }

  @Get()
  findAll() {
    return this.questionTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') idQuestionTemplate: string) {
    return this.questionTemplatesService.findOne(idQuestionTemplate);
  }

  @Put(':id')
  update(@Param('id') idQuestionTemplate: string, @Body() updateQuestionTemplateDto: UpdateQuestionTemplateDto) {
    return this.questionTemplatesService.update(idQuestionTemplate, updateQuestionTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') idQuestionTemplate: string) {
    return this.questionTemplatesService.remove(idQuestionTemplate);
  }
}
