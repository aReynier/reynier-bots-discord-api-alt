import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateGuildTemplateDto } from './create-guild-template.dto';

export class UpdateGuildTemplateDto extends PartialType(
  OmitType(CreateGuildTemplateDto, ['uuidGuildTemplate'] as const),
) {}
