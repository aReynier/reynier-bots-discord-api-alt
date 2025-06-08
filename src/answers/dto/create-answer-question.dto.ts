import { IntersectionType, PickType } from '@nestjs/swagger';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateAnswerQuestionDto extends IntersectionType(
    CreateAnswerDto, 
    PickType(PickableInternIdFields, ['idQuestion']))
  {
}