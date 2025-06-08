import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from './create-resource.dto';

// On exclut idMember du DTO de mise à jour
export class UpdateResourceDto extends PartialType(
  OmitType(CreateResourceDto, ['idMember'] as const)
) {} 