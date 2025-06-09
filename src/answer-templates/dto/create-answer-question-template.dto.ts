import { IntersectionType, PickType } from '@nestjs/swagger';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
import { CreateAnswerTemplateDto } from './create-answer-template.dto';

export class CreateAnswerQuestionTemplateDto extends IntersectionType(
    CreateAnswerTemplateDto, 
    PickType(PickableInternIdFields, ['idQuestionTemplate']))
  {
}