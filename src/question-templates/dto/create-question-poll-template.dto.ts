import { IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength, IsBoolean, ValidateNested, ArrayMinSize } from 'class-validator';
import { CreateAnswerDto } from 'src/answers/dto/create-answer.dto';
import { PickableInternIdFields } from 'src/utils/pickable-intern-id-fields';
import { CreateQuestionTemplateDto } from './create-question-template.dto';

export class CreateQuestionPollTemplateDto extends IntersectionType(
    CreateQuestionTemplateDto,
    PickType(PickableInternIdFields, ['idPollTemplate'])
) {
  @MaxLength(50)
  content: string;

  @IsBoolean()
  isMultipleAnswer: boolean;

  @ValidateNested({ each: true })
  @ArrayMinSize(2, {message: "La question doit avoir au moins deux réponses"})
  @Type(()=>CreateAnswerDto)
  answers: CreateAnswerDto[];
}