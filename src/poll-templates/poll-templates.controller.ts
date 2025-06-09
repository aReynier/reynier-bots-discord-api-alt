import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PollTemplatesService } from './poll-templates.service';
import { CreatePollTemplateDto } from './dto/create-poll-template.dto';
import { UpdatePollTemplateDto } from './dto/update-poll-template.dto';
import { PollTemplate } from './entities/poll-template.entity';

@ApiTags('Poll Templates')
@Controller('poll-templates')
export class PollTemplatesController {
  constructor(private readonly pollTemplatesService: PollTemplatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new poll template' })
  @ApiResponse({ status: 201, description: 'The poll template was created successfully.' })
  create(@Body() createPollTemplateDto: CreatePollTemplateDto) {
    return this.pollTemplatesService.create(createPollTemplateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all poll templates' })
  @ApiResponse({ status: 200, description: 'List of all poll templates.', type: [PollTemplate] })
  findAll() {
    return this.pollTemplatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific poll template by ID' })
  @ApiResponse({ status: 200, description: 'The poll template was retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Poll template not found.' })
  findOne(@Param('id') id: string) {
    return this.pollTemplatesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific poll template by ID' })
  @ApiResponse({ status: 200, description: 'The poll template was updated successfully.' })
  @ApiResponse({ status: 404, description: 'Poll template not found.' })
  update(@Param('id') id: string, @Body() updatePollTemplateDto: UpdatePollTemplateDto) {
    return this.pollTemplatesService.update(id, updatePollTemplateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific poll template by ID' })
  @ApiResponse({ status: 200, description: 'The poll template was deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Poll template not found.' })
  remove(@Param('id') id: string) {
    return this.pollTemplatesService.remove(id);
  }
}
