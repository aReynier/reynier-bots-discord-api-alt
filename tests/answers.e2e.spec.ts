import { test, expect } from '@playwright/test';
import { CreateAnswerQuestionDto } from '../src/answers/dto/create-answer-question.dto';

test.describe('Answers API E2E Tests', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  
  const testAnswer: CreateAnswerQuestionDto = {
    content: 'Test answer content',
    uuidQuestion: '123e4567-e89b-12d3-a456-426614174000'
  };

  let createdAnswerUuid: string;
});
