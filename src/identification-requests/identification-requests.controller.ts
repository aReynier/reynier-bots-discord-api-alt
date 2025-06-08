import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { IdentificationRequestsService } from './identification-requests.service';
import { CreateIdentificationRequestDto } from './dto/create-identification-request.dto';
import { UpdateIdentificationRequestDto } from './dto/update-identification-request.dto';

@Controller('identification-requests')
export class IdentificationRequestsController {
  constructor(private readonly identificationRequestsService: IdentificationRequestsService) {}

  @Post()
  create(@Body() createIdentificationRequestDto: CreateIdentificationRequestDto) {
    return this.identificationRequestsService.create(createIdentificationRequestDto);
  }

  @Get()
  findAll() {
    return this.identificationRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') idIdentificationRequest: string) {
    return this.identificationRequestsService.findOne(idIdentificationRequest);
  }

  @Put(':id')
  async update(@Param('id') idIdentificationRequest: string, @Body() updateIdentificationRequestDto: UpdateIdentificationRequestDto) {
    const identificationRequest = await this.identificationRequestsService.update(idIdentificationRequest, updateIdentificationRequestDto);
    if (!identificationRequest) {
      throw new NotFoundException(`IdentificationRequest with id "${idIdentificationRequest}" not found`);
    }
    return identificationRequest;
  }

  @Delete(':id')
  remove(@Param('id') idIdentificationRequest: string) {
    return this.identificationRequestsService.remove(idIdentificationRequest);
  }
}
